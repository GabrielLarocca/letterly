import 'express';

declare module 'express' {
  interface Request {
    id?: string;
    user?: {
      id: number;
      name?: string;
      email?: string;
      [key: string]: any;
    };
  }
} 