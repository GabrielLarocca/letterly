import { Request, Response, NextFunction } from 'express';
import Plan from '../models/plan.model';

export const getPlans = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const plans = await Plan.findAll();
    res.json(plans);
  } catch (error) {
    next(error);
  }
};

export const getPlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    
    if (!plan) {
      return res.status(404).json({ message: 'Plano não encontrado' });
    }

    res.json(plan);
  } catch (error) {
    next(error);
  }
};

export const createPlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newPlan = await Plan.create(req.body);
    res.status(201).json(newPlan);
  } catch (error) {
    next(error);
  }
};

export const updatePlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [affectedCount, affectedRows] = await Plan.update(req.body, {
      where: { id: req.params.id },
      returning: true
    });

    if (affectedCount === 0) {
      return res.status(404).json({ message: 'Plano não encontrado' });
    }

    res.json(affectedRows[0]);
  } catch (error) {
    next(error);
  }
};

export const deletePlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await Plan.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Plano não encontrado' });
    }

    res.json({ message: 'Plano excluído com sucesso' });
  } catch (error) {
    next(error);
  }
}; 

export const createPlans = async () => {
  try {
    // Verificar se já existem planos
    const existingPlans = await Plan.findAll();
    if (existingPlans.length > 0) {
      console.log('Planos já existem, pulando criação.');
      return;
    }
    
    // Criar planos padrão
    await Promise.all([
      Plan.create({
        id: 1,
        name: 'Básico',
        price: 5,
        photoLimit: 5,
        musicAllowed: false,
        customization: {features: ["Até 3 fotos", "Personalização básica", "Acesso por 1 ano", "Música de fundo", "Efeitos de emojis"]},
        expiryDuration: '1 year',
      }),
      Plan.create({
        id: 2,
        name: 'Padrão',
        price: 10,
        photoLimit: 8,
        musicAllowed: true,
        customization: {features: ["Até 8 fotos", "Personalização aprimorada", "Acesso por 1 anos", "Música de fundo", "Efeitos de emojis"]},
        expiryDuration: '1 year',
      }),
      Plan.create({
        id: 3,
        name: 'Premium',
        price: 12,
        photoLimit: 15,
        musicAllowed: true,
        customization: {features: ["Até 15 fotos", "Personalização avançada", "Acesso vitalício", "Biblioteca de músicas premium", "Efeitos de emojis", "Suporte prioritário"]},
        expiryDuration: null,
      }),
    ]);
  } catch (error) {
    console.error('Erro ao criar planos:', error);
    throw error;
  }
};
