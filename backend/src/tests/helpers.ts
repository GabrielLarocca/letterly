import User from '../models/user.model';
import Plan from '../models/plan.model';

export async function createTestUser() {
  return await User.create({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  });
}

export async function createTestPlan() {
  return await Plan.create({
    id: 1,
    name: 'Test Plan',
    photoLimit: 5,
    musicAllowed: true,
    price: 999
  });
} 