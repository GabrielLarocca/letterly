import { Router } from 'express';
import * as letterController from '../controllers/letter.controller';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

// Garantir que a pasta de uploads existe
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limite
});

router.get('/', letterController.getLetters);
router.get('/:id', letterController.getLetter);
router.get('/link/:uniqueLink', letterController.getLetterByUniqueLink);
router.get('/user/:userId', letterController.getUserLetters);

// Rota para criar carta com ou sem fotos
router.post('/', upload.array('photos', 10), letterController.createLetter);

router.put('/:id', letterController.updateLetter);
router.delete('/:id', letterController.deleteLetter);

export default router;