import User from '../models/user.model';
import Plan from '../models/plan.model';

export async function createTestUser() {
  return await User.create({
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  });
}

export async function createAllPlans() {
  return await Promise.all([
    Plan.create({
      id: 1,
      name: 'Básico',
      price: 5,
      photoLimit: 5,
      musicAllowed: false,
      customization: {features: ["Até 3 fotos", "Personalização básica", "Acesso por 1 ano", "Música de fundo", "Efeitos de emojis"]},
      expiryDuration: '1 year',
    }),
    Plan.create({
      id: 2,
      name: 'Padrão',
      price: 10,
      photoLimit: 8,
      musicAllowed: true,
      customization: {features: ["Até 8 fotos", "Personalização aprimorada", "Acesso por 1 anos", "Música de fundo", "Efeitos de emojis"]},
      expiryDuration: '1 year',
    }),
    Plan.create({
      id: 3,
      name: 'Premium',
      price: 12,
      photoLimit: 15,
      musicAllowed: true,
      customization: {features: ["Até 15 fotos", "Personalização avançada", "Acesso vitalício", "Biblioteca de músicas premium", "Efeitos de emojis", "Suporte prioritário"]},
      expiryDuration: null,
    }),
  ]);
}