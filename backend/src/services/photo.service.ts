import Photo from '../models/photo.model';

export const photoService = {
  async create(data: any) {
    return Photo.create(data);
  },
  
  async findByLetterId(letterId: number) {
    return Photo.findAll({ where: { letterId } });
  }
}; 