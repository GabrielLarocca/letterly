import { Request, Response, NextFunction } from 'express';
import { logger } from '../services/logger.service';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error('Erro na aplicação:', err);
  res.status(500).json({ message: 'Erro interno do servidor' });
}; 