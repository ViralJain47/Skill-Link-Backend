import { fileURLToPath } from 'url';
import path from "path"
import multer from 'multer';
import {v4 as uuidv4} from "uuid"

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const __storageFolder = path.join(path.dirname(path.dirname(__dirname)), '/storage')
export const __rootFolder = path.dirname(path.dirname(__dirname))


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __storageFolder);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname)
      const uniqueName = uuidv4() + ext
      cb(null, uniqueName);
    }
  });

export const upload = multer({storage})