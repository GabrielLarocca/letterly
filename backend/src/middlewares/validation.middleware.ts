import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validateLetter = (req: Request, res: Response, next: NextFunction) => {
  const letterSchema = z.object({
    phrase: z.string().min(1),
    font: z.string().optional(),
    colorScheme: z.string().optional(),
    animation: z.string().optional(),
    backgroundMusicUrl: z.string().url().optional()
  });

  try {
    letterSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: 'Dados inválidos' });
  }
}; 