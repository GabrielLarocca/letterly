import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

// Defina um tipo local para Request que inclui as propriedades extras
type Request = ExpressRequest & {
  id?: string;
  user?: {
    id: number;
    [key: string]: any;
  };
};

export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.id = uuidv4();
  next();
}; 