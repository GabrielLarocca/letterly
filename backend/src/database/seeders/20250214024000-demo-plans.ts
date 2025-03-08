import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  return queryInterface.bulkInsert('plans', [
    {
      name: 'Basic',
      photo_limit: 5,
      music_allowed: false,
      price: 9.99,
      created_at: new Date(),
      updated_at: new Date()
    },
    // ... outros planos
  ]);
} 