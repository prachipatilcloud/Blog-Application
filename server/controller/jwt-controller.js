import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (request, response, next) => {
    let token = request.cookies?.accessToken;
    
    if (!token) {
        const authHeader = request.headers['authorization'];
        token = authHeader && authHeader.split(' ')[1];
    }

    if (process.env.NODE_ENV === 'development') {
        console.log("Received Token:", token ? 'Token present' : 'No token');
    }

    if (!token) {
        return response.status(401).json({ 
            success: false, 
            message: 'Unauthorized: Access token required' 
        });
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if (error) {
            console.error("JWT Verification Error:", error.message);
            
            let message = 'Invalid token';
            if (error.name === 'TokenExpiredError') {
                message = 'Token has expired';
            } else if (error.name === 'JsonWebTokenError') {
                message = 'Invalid token format';
            }
            
            return response.status(403).json({ 
                success: false, 
                message: message 
            });
        }
        request.user = user;
        next();
    });
};
