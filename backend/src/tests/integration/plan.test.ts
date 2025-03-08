import request from 'supertest';
import app from '../../app';
import Plan from '../../models/plan.model';

describe('Plan Integration Tests', () => {
  beforeEach(async () => {
    await Plan.destroy({ where: {} });
  });

  const samplePlan = {
    name: 'Basic',
    photoLimit: 5,
    musicAllowed: false,
    price: 9.99
  };

  describe('POST /api/plans', () => {
    it('should create a new plan', async () => {
      const response = await request(app)
        .post('/api/plans')
        .send(samplePlan);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe(samplePlan.name);
    });
  });

  describe('GET /api/plans', () => {
    it('should return all plans', async () => {
      await Plan.create(samplePlan);

      const response = await request(app)
        .get('/api/plans');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe(samplePlan.name);
    });
  });

  describe('GET /api/plans/:id', () => {
    it('should return a specific plan', async () => {
      const plan = await Plan.create(samplePlan);

      const response = await request(app)
        .get(`/api/plans/${plan.id}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(samplePlan.name);
    });

    it('should return 404 for non-existent plan', async () => {
      const response = await request(app)
        .get('/api/plans/999');

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/plans/:id', () => {
    it('should update a plan', async () => {
      const plan = await Plan.create(samplePlan);
      const updateData = { name: 'Premium' };

      const response = await request(app)
        .put(`/api/plans/${plan.id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(updateData.name);
    });
  });

  describe('DELETE /api/plans/:id', () => {
    it('should delete a plan', async () => {
      const plan = await Plan.create(samplePlan);

      const response = await request(app)
        .delete(`/api/plans/${plan.id}`);

      expect(response.status).toBe(200);

      const deletedPlan = await Plan.findByPk(plan.id);
      expect(deletedPlan).toBeNull();
    });
  });
}); 