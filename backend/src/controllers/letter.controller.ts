import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { z } from 'zod';
import Letter from '../models/letter.model';
import type { InferAttributes, CreationAttributes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { logger, cacheService, uploadService } from '../services';
import { letterService, photoService } from '../services';

// Defina um tipo local para Request que inclui as propriedades extras
type Request = ExpressRequest & {
  id?: string;
  user?: {
    id: number;
    [key: string]: any;
  };
};

// Schema de validação
const letterSchema = z.object({
  phrase: z.string().min(1),
  font: z.string().optional(),
  colorScheme: z.string().optional(),
  backgroundMusicUrl: z.string().url().optional(),
});

type LetterAttributes = InferAttributes<Letter>;

export const getLetters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const letters = await Letter.findAll();
    res.json(letters);
  } catch (error) {
    next(error);
  }
};

export const getLetter = async (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  try {
    const cacheKey = `letter:${req.params.id}`;
    
    // Tentar buscar do cache
    const cachedLetter = await cacheService.get(cacheKey);
    if (cachedLetter) {
      logger.info('Carta recuperada do cache', { 
        id: req.params.id,
        requestId: req?.id 
      });
      return res.json(cachedLetter);
    }

    // Buscar do banco
    const letter = await Letter.findByPk(req.params.id);
    
    if (!letter) {
      logger.warn('Carta não encontrada', { 
        id: req.params.id,
        requestId: req?.id 
      });
      return res.status(404).json({ message: 'Carta não encontrada' });
    }

    // Salvar no cache
    await cacheService.set(cacheKey, letter, 3600);

    logger.info('Carta recuperada do banco', { 
      id: req.params.id,
      requestId: req?.id 
    });

    res.json(letter);
  } catch (error: unknown) {
    logger.error('Erro ao buscar carta', {
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      id: req.params.id,
      requestId: req?.id
    });
    next(error);
  }
};

export const getLetterByUniqueLink = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const letter = await Letter.findOne({
      where: { uniqueLink: req.params.uniqueLink }
    });

    if (!letter) {
      return res.status(404).json({ message: 'Carta não encontrada' });
    }

    // Verificar se a carta expirou
    if (letter.expiryDate && new Date() > letter.expiryDate) {
      return res.status(410).json({ message: 'Esta carta expirou' });
    }

    res.json(letter);
  } catch (error) {
    next(error);
  }
};

export const createLetter = async (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  try {
    console.log('Corpo da requisição completo:', req.body);
    console.log('Headers:', req.headers);
    console.log('Arquivos recebidos:', req.files);
    
    // Verificar se temos dados JSON na requisição
    let letterData;
    if (req.body.data) {
      try {
        letterData = JSON.parse(req.body.data);
      } catch (error) {
        console.error("Erro ao parsear dados JSON:", error);
        return res.status(400).json({ message: "Formato de dados inválido" });
      }
    } else {
      // Se não tiver o campo data, usar o corpo diretamente
      letterData = req.body;
    }
    
    // Validar os dados
    try {
      letterSchema.parse(letterData);
    } catch (error) {
      console.error("Erro de validação:", error);
      return res.status(400).json({ message: "Dados inválidos", error });
    }

    logger.info('Iniciando criação de carta', {
      userId: req.user?.id,
      requestId: req.id
    });

    // Upload de fotos se houver
    let photoUrls: string[] = [];
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      console.log("Processando arquivos...");
      photoUrls = await Promise.all(
        (req.files as Express.Multer.File[]).map(file => {
          console.log("Processando arquivo:", file.originalname);
          return uploadService.uploadFile(file);
        })
      );
    }

    // Criar carta com interface correta
    const letter = await Letter.create({
      phrase: letterData.phrase,
      backgroundMusicUrl: letterData.backgroundMusicUrl,
      userId: req.user?.id || 1,
      uniqueLink: uuidv4(),
      photoUrls: photoUrls
    });

    // Usar o método correto do cache service
    await cacheService.set(`user:${req.user?.id}:letters`, null);

    logger.info('Carta criada com sucesso', {
      letterId: letter.id,
      duration: `${Date.now() - startTime}ms`,
      requestId: req?.id
    });

    res.status(201).json(letter);
  } catch (error: unknown) {
    console.error('Erro detalhado:', error);
    logger.error('Erro ao criar carta', {
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      stack: error instanceof Error ? error.stack : undefined,
      userId: req.user?.id,
      requestId: req?.id,
      duration: `${Date.now() - startTime}ms`
    });
    next(error);
  }
};

export const updateLetter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [affectedCount, affectedRows] = await Letter.update(req.body, {
      where: { id: req.params.id },
      returning: true
    });

    if (affectedCount === 0) {
      return res.status(404).json({ message: 'Carta não encontrada' });
    }

    res.json(affectedRows[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteLetter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await Letter.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Carta não encontrada' });
    }

    res.json({ message: 'Carta excluída com sucesso' });
  } catch (error) {
    next(error);
  }
};

export const getUserLetters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const letters = await Letter.findAll({
      where: { userId: req.params.userId }
    });

    res.json(letters);
  } catch (error) {
    next(error);
  }
};

// Método para criar carta com fotos
export const createWithPhotos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Recebendo requisição para criar carta com fotos");
    console.log("Body:", req.body);
    console.log("Files:", req.files);
    
    // Verificar se temos os dados da carta
    if (!req.body.data) {
      return res.status(400).json({ message: "Dados da carta são obrigatórios" });
    }
    
    // Parsear os dados da carta
    let letterData;
    try {
      letterData = JSON.parse(req.body.data);
    } catch (error) {
      console.error("Erro ao parsear dados da carta:", error);
      return res.status(400).json({ message: "Formato de dados inválido" });
    }
    
    // Verificar se temos arquivos
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      console.log("Nenhum arquivo recebido");
      // Continuar mesmo sem fotos
    }
    
    // Criar a carta no banco de dados
    const letter = await letterService.create({
      userId: req.user?.id || 1, // Usar ID do usuário autenticado ou padrão
      phrase: letterData.phrase,
      backgroundMusicUrl: letterData.backgroundMusicUrl,
    });
    
    // Se temos arquivos, processar e salvar
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      // Processar cada arquivo
      for (const file of req.files) {
        // Salvar arquivo e criar registro na tabela de fotos
        await photoService.create({
          letterId: letter.id,
          url: file.path, // Caminho onde o arquivo foi salvo
          filename: file.filename,
        });
      }
    }
    
    // Retornar a carta criada
    return res.status(201).json(letter);
  } catch (error) {
    console.error("Erro ao criar carta com fotos:", error);
    next(error);
  }
};