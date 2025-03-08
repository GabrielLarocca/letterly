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