import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger';
import { logger } from './services/logger.service';
import { apiLimiter } from './middlewares/rateLimiter.middleware';
import { errorHandler } from './middlewares/error.middleware';
import routes from './routes';
import { requestIdMiddleware } from './middlewares/request-id.middleware';
import { mockAuthMiddleware } from './middlewares/mock-auth.middleware';
import cors from 'cors';

const app = express();

// Middleware para adicionar cabeçalhos CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestIdMiddleware);

// Rate Limiting
app.use('/api', apiLimiter);

// Middleware de autenticação simulada (apenas para desenvolvimento)
if (process.env.NODE_ENV !== 'production') {
  app.use(mockAuthMiddleware);
}

// Logging de requisições
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    logger.info('Requisição processada', {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${Date.now() - start}ms`,
      userAgent: req.get('user-agent'),
    });
  });

  next();
});

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rotas da API
app.use('/api', routes);

// Tratamento de erros
app.use(errorHandler);

export default app;
