// src/interfaces/photo.interfaces.ts
export interface PhotoAttributes {
    id: number;
    letterId: number; // Foreign key linking to a Letter
    imageUrl: string; // URL/path to the image (e.g., stored in AWS S3)
    displayOrder?: number; // Order in which photos appear in the carousel
  }
  