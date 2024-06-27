import path from 'node:path';
import { mkdirSync } from 'node:fs';
import type { StorageEngine } from 'multer';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(process.cwd(), '/public/bills');
    mkdirSync(destinationPath, { recursive: true });
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

export const fileFilter = (req, file, callback): void => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

export const upload = multer({ storage, fileFilter, limits: { fieldSize: 25 * 1024 * 1024 } });
