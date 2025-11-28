
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple disk storage (more reliable than GridFS)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/')); // Store in uploads folder
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-blogApp-${file.originalname}`;
        cb(null, uniqueName);
    }
});

// export default  multer({ storage });

const upload = multer({
    storage,
    limits: { 
        fileSize: 50 * 1024 * 1024, // Limit file size to 50MB
        fieldSize: 50 * 1024 * 1024  // Limit field size to 50MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only images are allowed (PNG, JPG, JPEG, WEBP)'), false);
        }
        cb(null, true);
    }
});

export default upload;