// src/interfaces/user.interfaces.ts
export interface UserAttributes {
    id?: number;
    name: string;
    email: string;
    password: string;
    currentPlan?: string;
    planStartDate?: Date;
    planExpiryDate?: Date;
    maxPhotos?: number;
    musicAllowed?: boolean;
  }
  