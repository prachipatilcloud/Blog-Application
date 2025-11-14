import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const Connection = async() => {
    const URL = process.env.MONGODB_URI;
    
    if (!URL) {
        console.error('MONGODB_URI is not defined in environment variables');
        process.exit(1);
    }
    
    try {
        await mongoose.connect(URL);
        console.log('Database connected successfully');
        
    } catch (error) {
        console.log('Error while connecting database', error);
        process.exit(1);
    }
}

export default Connection;

// const mongoose = require('mongoose');
// require('dotenv').config();

// const dbconnect = () => {
//     mongoose.connect('mongodb://127.0.0.1:27017/blogApp')
//         .then(() => {
//             console.log('Database connected successfully');
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

// module.exports = dbconnect;