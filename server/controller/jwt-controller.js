import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


// export const authenticateToken = (request, response, next) => {
//     const authHeader = request.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//         return response.status(401).json({ msg: 'Unauthorized: Token not found' });
//     }

//     jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
//         if (error){
//             return response.status(403).json({msg: 'invalid token'});
//         }
//         request.user = user;
//         next();
//     })
// }

export const authenticateToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log("Received Token:", token); // Log the token received

    if (!token) {
        return response.status(401).json({ msg: 'Unauthorized: Token not found' });
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if (error) {
            console.error("JWT Verification Error:", error.message); // Log exact error
            return response.status(403).json({ msg: 'Invalid token' });
        }
        request.user = user;
        next();
    });
};
