import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';
import fs from 'fs';

interface UploadService {
  s3Client: S3Client;
  uploadFile(file: Express.Multer.File): Promise<string>;
}

export const uploadService: UploadService = {
  s3Client: new S3Client({ region: process.env.AWS_REGION }),
  
  async uploadFile(file: Express.Multer.File): Promise<string> {
    // O arquivo já foi salvo pelo multer, então apenas retornamos o caminho
    console.log("Arquivo salvo em:", file.path);
    
    // Converter para URL relativa
    const relativePath = file.path.replace(/\\/g, '/');
    
    // Retornar URL para acessar o arquivo
    return `/uploads/${path.basename(relativePath)}`;
  }
}; 