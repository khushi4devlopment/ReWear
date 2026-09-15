import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Resolve against this file, not process.cwd(), so uploads land in server/uploads
// no matter which directory the process was started from.
export const uploadDir = path.resolve(__dirname, '../../uploads');
fs.mkdirSync(uploadDir, {recursive: true});

const storage = multer.diskStorage({
  destination: (_, __unused, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname).toLowerCase()}`)
});

export const upload = multer({
  storage,
  limits: {fileSize: 4 * 1024 * 1024},
  fileFilter: (_, file, cb) => {
    if (/^image\/(jpeg|png|webp)$/.test(file.mimetype)) return cb(null, true);
    const err = new Error('Only JPG, PNG and WEBP images are allowed');
    err.status = 400;
    cb(err);
  }
});
