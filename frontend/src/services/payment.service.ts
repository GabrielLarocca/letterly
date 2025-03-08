import { fetchApi } from "./api";

export interface PaymentIntent {
  clientSecret: string;
  planDetails: {
    maxFotos: number;
    musicaPermitida: boolean;
    duracaoExpiracao: string;
  };
}

export interface Payment {
  id: number;
  userId: number;
  letterId?: number;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  transactionId: string;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

/**
 * Serviço para gerenciar pagamentos
 */
export const paymentService = {
  /**
   * Cria uma intenção de pagamento
   */
  createPaymentIntent: (planId: string, userId: number, letterId?: number) => 
    fetchApi<PaymentIntent>("/payments/create-intent", {
      method: "POST",
      body: { planId, userId, letterId },
    }),

  /**
   * Busca histórico de pagamentos de um usuário
   */
  getPaymentHistory: (userId: number) => 
    fetchApi<Payment[]>(`/payments/history/${userId}`),

  /**
   * Solicita reembolso de um pagamento
   */
  refundPayment: (paymentId: number, reason: string) => 
    fetchApi<{ message: string; refundDetails: any }>(`/payments/${paymentId}/refund`, {
      method: "POST",
      body: { reason },
    }),
}; 