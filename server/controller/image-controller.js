import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;
const url = `http://localhost:${PORT}`;

export const uploadImage = (request, response) => {
    if (!request.file) {
        return response.status(400).json({ 
            success: false,
            message: "No file uploaded" 
        });
    }

    const imageUrl = `${url}/file/${request.file.filename}`;
    
    return response.status(200).json({ 
        success: true,
        message: "Image uploaded successfully",
        data: {
            filename: request.file.filename,
            imageUrl: imageUrl
        }
    });
}

export const getImage = (request, response) => {
    try {
        const filename = request.params.filename;
        const filePath = path.join(__dirname, '../uploads/', filename);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return response.status(404).json({ 
                success: false,
                message: "Image not found" 
            });
        }

        // Get file extension to set proper content type
        const ext = path.extname(filename).toLowerCase();
        const contentType = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.webp': 'image/webp'
        }[ext] || 'image/jpeg';

        response.setHeader('Content-Type', contentType);
        
        // Stream the file
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(response);
    } catch (error) {
        console.error('Get Image Error:', error);
        return response.status(500).json({ 
            success: false,
            message: "Error retrieving image",
            error: error.message 
        });
    }
}