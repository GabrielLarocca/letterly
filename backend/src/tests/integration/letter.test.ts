import request from 'supertest';
import app from '../../app';
import { createTestUser, createTestPlan } from '../helpers';

describe('Letter Integration Tests', () => {
  let testUser: any;
  let testPlan: any;

  beforeAll(async () => {
    testUser = await createTestUser();
    testPlan = await createTestPlan();
  });

  it('should create a letter successfully', async () => {
    const response = await request(app)
      .post('/api/letters')
      .set('Authorization', `Bearer ${testUser.token}`)
      .send({
        phrase: 'Test letter',
        planId: testPlan.id
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('uniqueLink');
  });
}); 