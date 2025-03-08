import request from 'supertest';
import app from '../../app';
import Photo from '../../models/photo.model';
import Letter from '../../models/letter.model';

describe('Photo Integration Tests', () => {
  let testLetter: any;

  beforeEach(async () => {
    await Photo.destroy({ where: {} });
    await Letter.destroy({ where: {} });
    
    testLetter = await Letter.create({
      userId: 1,
      phrase: 'Test phrase',
      uniqueLink: 'test-link'
    });
  });

  const samplePhoto = {
    imageUrl: 'https://example.com/photo.jpg',
    displayOrder: 1
  };

  describe('POST /api/photos/letter/:letterId', () => {
    it('should create a new photo', async () => {
      const response = await request(app)
        .post(`/api/photos/letter/${testLetter.id}`)
        .send(samplePhoto);

      expect(response.status).toBe(201);
      expect(response.body.imageUrl).toBe(samplePhoto.imageUrl);
    });
  });

  describe('GET /api/photos/letter/:letterId', () => {
    it('should return all photos for a letter', async () => {
      await Photo.create({
        ...samplePhoto,
        letterId: testLetter.id
      });

      const response = await request(app)
        .get(`/api/photos/letter/${testLetter.id}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].imageUrl).toBe(samplePhoto.imageUrl);
    });
  });

  describe('PUT /api/photos/:id', () => {
    it('should update a photo', async () => {
      const photo = await Photo.create({
        ...samplePhoto,
        letterId: testLetter.id
      });

      const updateData = { displayOrder: 2 };

      const response = await request(app)
        .put(`/api/photos/${photo.id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.displayOrder).toBe(updateData.displayOrder);
    });
  });

  describe('DELETE /api/photos/:id', () => {
    it('should delete a photo', async () => {
      const photo = await Photo.create({
        ...samplePhoto,
        letterId: testLetter.id
      });

      const response = await request(app)
        .delete(`/api/photos/${photo.id}`);

      expect(response.status).toBe(200);

      const deletedPhoto = await Photo.findByPk(photo.id);
      expect(deletedPhoto).toBeNull();
    });
  });

  describe('POST /api/photos/reorder', () => {
    it('should reorder photos', async () => {
      const photo1 = await Photo.create({
        ...samplePhoto,
        letterId: testLetter.id,
        displayOrder: 1
      });

      const photo2 = await Photo.create({
        ...samplePhoto,
        letterId: testLetter.id,
        displayOrder: 2
      });

      const reorderData = {
        photoOrders: [
          { id: photo1.id, displayOrder: 2 },
          { id: photo2.id, displayOrder: 1 }
        ]
      };

      const response = await request(app)
        .post('/api/photos/reorder')
        .send(reorderData);

      expect(response.status).toBe(200);

      const updatedPhoto1 = await Photo.findByPk(photo1.id);
      const updatedPhoto2 = await Photo.findByPk(photo2.id);

      expect(updatedPhoto1?.displayOrder).toBe(2);
      expect(updatedPhoto2?.displayOrder).toBe(1);
    });
  });
}); 