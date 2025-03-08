import { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
import Payment from '../models/payment.model';
import User from '../models/user.model';
import Letter from '../models/letter.model';

// Inicialização do Stripe com chave secreta do ambiente
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

// Definição dos planos e seus preços
const PLANOS = {
  basic: {
    preco: 999, // R$9.99
    nome: 'Basic',
    recursos: {
      maxFotos: 5,
      musicaPermitida: false,
      duracaoExpiracao: '1 ano'
    }
  },
  standard: {
    preco: 1999, // R$19.99
    nome: 'Standard',
    recursos: {
      maxFotos: 15,
      musicaPermitida: true,
      duracaoExpiracao: '3 anos'
    }
  },
  premium: {
    preco: 2999, // R$29.99
    nome: 'Premium',
    recursos: {
      maxFotos: -1, // ilimitado
      musicaPermitida: true,
      duracaoExpiracao: 'vitalício'
    }
  }
};

/**
 * Cria uma intenção de pagamento no Stripe
 * @param req Request contendo planId e userId
 * @param res Response com o client_secret do Stripe
 */
export const createPaymentIntent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { planId, userId, letterId } = req.body;

    // Validação dos dados de entrada
    if (!planId || !userId) {
      return res.status(400).json({ 
        message: 'Dados incompletos. planId e userId são obrigatórios' 
      });
    }

    // Verifica se o plano existe
    const plano = PLANOS[planId as keyof typeof PLANOS];
    if (!plano) {
      return res.status(400).json({ message: 'Plano inválido' });
    }

    // Verifica se o usuário existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Se houver letterId, verifica se a carta existe
    if (letterId) {
      const letter = await Letter.findByPk(letterId);
      if (!letter) {
        return res.status(404).json({ message: 'Carta não encontrada' });
      }
    }

    // Cria a intenção de pagamento no Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: plano.preco,
      currency: 'brl',
      metadata: {
        userId,
        planId,
        planName: plano.nome,
        letterId: letterId || '',
        maxPhotos: plano.recursos.maxFotos.toString(),
        musicAllowed: plano.recursos.musicaPermitida.toString(),
        expirationDuration: plano.recursos.duracaoExpiracao
      },
      payment_method_types: ['card'],
      capture_method: 'automatic',
    });

    // Registra a tentativa de pagamento no banco
    await Payment.create({
      userId,
      letterId: letterId || null,
      amount: plano.preco,
      currency: 'BRL',
      paymentStatus: 'pending',
      transactionId: paymentIntent.id,
      paymentMethod: 'card',
      metadata: {
        planDetails: plano.recursos
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      planDetails: plano.recursos
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Processa webhooks do Stripe para atualizar status de pagamentos
 */
export const handleWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sig = req.headers['stripe-signature']!;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event;

    // Verifica a assinatura do webhook
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        webhookSecret
      );
    } catch (err) {
      console.error('Erro na assinatura do webhook:', err);
      return res.status(400).json({ message: 'Erro na validação do webhook' });
    }

    // Processa diferentes tipos de eventos
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
        break;
      
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object as Stripe.PaymentIntent);
        break;

      case 'charge.refunded':
        await handleRefund(event.data.object as Stripe.Charge);
        break;
    }

    res.json({ received: true });
  } catch (error) {
    next(error);
  }
};

/**
 * Processa pagamentos bem-sucedidos
 */
async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const { userId, planId, letterId } = paymentIntent.metadata;

  // Atualiza o pagamento no banco
  await Payment.update(
    {
      paymentStatus: 'succeeded',
      metadata: {
        stripeResponse: paymentIntent
      }
    },
    {
      where: { transactionId: paymentIntent.id }
    }
  );

  // Atualiza o plano do usuário
  await User.update(
    {
      currentPlan: planId,
      planStartDate: new Date(),
      planExpiryDate: calculateExpiryDate(planId),
      maxPhotos: parseInt(paymentIntent.metadata.maxPhotos),
      musicAllowed: paymentIntent.metadata.musicAllowed === 'true'
    },
    {
      where: { id: userId }
    }
  );

  // Se houver uma carta associada, atualiza ela também
  if (letterId) {
    await Letter.update(
      {
        planId: parseInt(planId),
        expiryDate: calculateExpiryDate(planId)
      },
      {
        where: { id: letterId }
      }
    );
  }
}

/**
 * Processa falhas de pagamento
 */
async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  await Payment.update(
    {
      paymentStatus: 'failed',
      metadata: {
        stripeResponse: paymentIntent,
        failureReason: paymentIntent.last_payment_error?.message
      }
    },
    {
      where: { transactionId: paymentIntent.id }
    }
  );
}

/**
 * Processa reembolsos
 */
async function handleRefund(charge: Stripe.Charge) {
  if (!charge.payment_intent || !charge.refunds) return;

  const payment = await Payment.findOne({
    where: { transactionId: charge.payment_intent.toString() }
  });

  if (payment) {
    await payment.update({
      paymentStatus: 'refunded',
      metadata: {
        ...payment.metadata,
        refundDetails: charge.refunds.data[0]
      }
    });

    // Reverte benefícios do plano se necessário
    if (payment.userId) {
      await User.update(
        {
          currentPlan: 'free',
          maxPhotos: 1,
          musicAllowed: false
        },
        {
          where: { id: payment.userId }
        }
      );
    }
  }
}

/**
 * Retorna histórico de pagamentos de um usuário
 */
export const getPaymentHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payments = await Payment.findAll({
      where: { userId: req.params.userId },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Letter,
          attributes: ['id', 'phrase', 'uniqueLink']
        }
      ]
    });

    res.json(payments);
  } catch (error) {
    next(error);
  }
};

/**
 * Processa solicitação de reembolso
 */
export const refundPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payment = await Payment.findByPk(req.params.paymentId);

    if (!payment) {
      return res.status(404).json({ message: 'Pagamento não encontrado' });
    }

    if (payment.paymentStatus !== 'succeeded') {
      return res.status(400).json({ 
        message: 'Apenas pagamentos bem-sucedidos podem ser reembolsados' 
      });
    }

    // Verifica se já passou o período permitido para reembolso (ex: 7 dias)
    const refundDeadline = new Date(payment.createdAt);
    refundDeadline.setDate(refundDeadline.getDate() + 7);

    if (new Date() > refundDeadline) {
      return res.status(400).json({ 
        message: 'Período de reembolso expirado' 
      });
    }

    // Processa o reembolso no Stripe
    const refund = await stripe.refunds.create({
      payment_intent: payment.transactionId,
      reason: req.body.reason || 'requested_by_customer'
    });

    // Atualiza o status do pagamento
    await payment.update({
      paymentStatus: 'refunded',
      metadata: {
        ...payment.metadata,
        refundDetails: refund,
        refundReason: req.body.reason,
        refundRequestedBy: req.body.requestedBy
      }
    });

    res.json({ 
      message: 'Reembolso processado com sucesso',
      refundDetails: refund
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Calcula a data de expiração com base no plano
 */
function calculateExpiryDate(planId: string): Date {
  const hoje = new Date();
  const plano = PLANOS[planId as keyof typeof PLANOS];
  
  switch (plano?.recursos.duracaoExpiracao) {
    case '1 ano':
      return new Date(hoje.setFullYear(hoje.getFullYear() + 1));
    case '3 anos':
      return new Date(hoje.setFullYear(hoje.getFullYear() + 3));
    case 'vitalício':
      return new Date(hoje.setFullYear(hoje.getFullYear() + 100));
    default:
      return new Date(hoje.setFullYear(hoje.getFullYear() + 1));
  }
}