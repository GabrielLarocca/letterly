import { Request as ExpressRequest, Response, NextFunction } from 'express';

// Defina um tipo local para Request que inclui as propriedades extras
type Request = ExpressRequest & {
  id?: string;
  user?: {
    id: number;
    [key: string]: any;
  };
};

// Middleware temporário para desenvolvimento
export const mockAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Simula um usuário autenticado
  req.user = {
    id: 1,
    name: 'Usuário de Teste',
    email: 'teste@example.com'
  };
  next();
}; 