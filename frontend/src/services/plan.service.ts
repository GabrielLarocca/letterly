import { fetchApi } from "./api";

export interface Plan {
  id: number;
  name: string;
  photoLimit: number;
  musicAllowed: boolean;
  customization?: any;
  expiryDuration?: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Serviço para gerenciar planos
 */
export const planService = {
  /**
   * Busca todos os planos
   */
  getAll: () => fetchApi<Plan[]>("/plans"),

  /**
   * Busca um plano pelo ID
   */
  getById: (id: number) => fetchApi<Plan>(`/plans/${id}`),
}; 