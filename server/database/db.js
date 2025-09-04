import mongoose from "mongoose";

export const Connection = async() => {
    const URL = 'mongodb://127.0.0.1:27017/blogApp';
    try {
        await mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
        
    } catch (error) {
        console.log('Error while connecting database', error);
        
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