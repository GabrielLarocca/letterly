import { API_URL } from "../config";
import { uploadFiles, fetchData } from "./api";

export interface Letter {
  id: number;
  userId: number;
  planId?: number;
  phrase: string;
  font?: string;
  colorScheme?: string;
  animation?: string;
  backgroundMusicUrl?: string;
  uniqueLink: string;
  qrCode?: string;
  expiryDate?: string;
  photoUrls?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateLetterDto {
  phrase: string;
  font?: string;
  colorScheme?: string;
  backgroundMusicUrl?: string;
}

/**
 * Serviço para gerenciar cartas
 */
export const letterService = {
  /**
   * Busca todas as cartas
   */
  async getAll(): Promise<Letter[]> {
    return fetchData("/letters");
  },

  /**
   * Busca uma carta pelo ID
   */
  async getById(id: number): Promise<Letter> {
    return fetchData(`/letters/${id}`);
  },

  /**
   * Busca uma carta pelo link único
   */
  getByUniqueLink: (uniqueLink: string) => fetchData<Letter>(`/letters/link/${uniqueLink}`),

  /**
   * Cria uma nova carta
   */
  async create(data: CreateLetterDto): Promise<Letter> {
    return fetchData("/letters", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  /**
   * Cria uma nova carta com fotos
   */
  async createWithPhotos(data: CreateLetterDto, photos: File[]): Promise<Letter> {
    console.log("Enviando dados para o backend:", { data, photos });
    
    // Converter o objeto data para JSON string e adicionar como campo formData
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    
    // Adicionar cada foto ao formData
    photos.forEach((photo, index) => {
      // Usar apenas 'photos' como nome do campo, não 'photos[index]'
      formData.append('photos', photo);
    });
    
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
  
    try {
      const response = await fetch(`${API_URL}/letters/`, {
        method: "POST",
        body: formData,
        // Não definir Content-Type, o navegador vai configurar automaticamente com boundary
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro na resposta:", response.status, errorText);
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Erro ao criar carta com fotos:", error);
      throw error;
    }
  },

  /**
   * Atualiza uma carta existente
   */
  async update(id: number, data: Partial<CreateLetterDto>): Promise<Letter> {
    return fetchData(`/letters/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  /**
   * Exclui uma carta
   */
  async delete(id: number): Promise<void> {
    return fetchData(`/letters/${id}`, {
      method: "DELETE",
    });
  },

  /**
   * Busca cartas de um usuário
   */
  getUserLetters: (userId: number) => 
    fetchData<Letter[]>(`/users/${userId}/letters`),
}; 