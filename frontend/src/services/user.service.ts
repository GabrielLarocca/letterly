import { fetchApi } from "./api";

export interface User {
  id: number;
  name: string;
  email: string;
  currentPlan?: string;
  planStartDate?: string;
  planExpiryDate?: string;
  maxPhotos?: number;
  musicAllowed?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

/**
 * Serviço para gerenciar usuários
 */
export const userService = {
  /**
   * Busca todos os usuários
   */
  getAll: () => fetchApi<User[]>("/users"),

  /**
   * Busca um usuário pelo ID
   */
  getById: (id: number) => fetchApi<User>(`/users/${id}`),

  /**
   * Cria um novo usuário
   */
  create: (userData: CreateUserDto) => 
    fetchApi<User>("/users", {
      method: "POST",
      body: userData,
    }),

  /**
   * Atualiza um usuário existente
   */
  update: (id: number, userData: Partial<User>) => 
    fetchApi<User>(`/users/${id}`, {
      method: "PUT",
      body: userData,
    }),

  /**
   * Exclui um usuário
   */
  delete: (id: number) => 
    fetchApi<{ message: string }>(`/users/${id}`, {
      method: "DELETE",
    }),
}; 