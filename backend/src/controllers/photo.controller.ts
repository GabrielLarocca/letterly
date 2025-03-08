import { Request, Response, NextFunction } from 'express';
import Photo from '../models/photo.model';

export const getPhotos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const photos = await Photo.findAll({
      where: { letterId: req.params.letterId },
      order: [['displayOrder', 'ASC']]
    });
    res.json(photos);
  } catch (error) {
    next(error);
  }
};

export const getPhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const photo = await Photo.findByPk(req.params.id);
    
    if (!photo) {
      return res.status(404).json({ message: 'Foto não encontrada' });
    }

    res.json(photo);
  } catch (error) {
    next(error);
  }
};

export const createPhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newPhoto = await Photo.create({
      ...req.body,
      letterId: req.params.letterId
    });
    res.status(201).json(newPhoto);
  } catch (error) {
    next(error);
  }
};

export const updatePhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [affectedCount, affectedRows] = await Photo.update(req.body, {
      where: { id: req.params.id },
      returning: true
    });

    if (affectedCount === 0) {
      return res.status(404).json({ message: 'Foto não encontrada' });
    }

    res.json(affectedRows[0]);
  } catch (error) {
    next(error);
  }
};

export const deletePhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await Photo.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Foto não encontrada' });
    }

    res.json({ message: 'Foto excluída com sucesso' });
  } catch (error) {
    next(error);
  }
};

export const reorderPhotos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { photoOrders } = req.body; // Array de { id, displayOrder }
    
    for (const order of photoOrders) {
      await Photo.update(
        { displayOrder: order.displayOrder },
        { where: { id: order.id } }
      );
    }

    res.json({ message: 'Ordem das fotos atualizada com sucesso' });
  } catch (error) {
    next(error);
  }
}; 