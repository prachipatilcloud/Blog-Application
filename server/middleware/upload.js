
import multer from 'multer';

import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;



const storage = new GridFsStorage({
    url: 'mongodb://127.0.0.1:27017/blogApp',
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (request, file) => {
        return new Promise((resolve, reject) => {
            const match = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

        

        // if (match.indexOf(file.mimetype) === -1) {
        //     return `${Date.now()}-blogApp-${file.originalname}`;
             
        // }

        if (!allowedTypes.includes(file.mimetype)) {
            return reject(new Error('Invalid file type. Only PNG, JPEG, JPG, and WEBP allowed.'));
        }

        resolve({
            bucketName: 'fs', // GridFS bucket name
            filename: `${Date.now()}-blogApp-${file.originalname}`
        });
    });
}

        // return {
        //     bucketName: 'fs',
        //     filename: `${Date.now()}-blogApp-${file.originalname}`
        // };
    

})

// export default  multer({ storage });

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // Limit file size to 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only images are allowed (PNG, JPG, JPEG, WEBP)'), false);
        }
        cb(null, true);
    }
});

export default upload;