import Letter from '../models/letter.model';

export const letterService = {
  async create(data: any) {
    return Letter.create(data);
  },
  
  async findById(id: number) {
    return Letter.findByPk(id);
  },
  
  async findAll() {
    return Letter.findAll();
  }
}; 