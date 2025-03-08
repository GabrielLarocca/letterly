import { Request } from 'express';
import { Express } from 'express-serve-static-core';

declare global {
  namespace Express {
    interface Request {
      id?: string;
      user?: {
        id: number;
        [key: string]: any;
      };
      files?: Express.Multer.File[];
    }
  }
} 