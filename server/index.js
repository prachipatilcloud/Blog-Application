import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';

import Connection from './database/db.js';
import Router from './routes/route.js'

dotenv.config();



const app = express();
import cookieParser from 'cookie-parser';
app.use(cookieParser());

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', Router);

app.use(express.json({ limit: '50mb' }));  // Increase JSON payload size limit
app.use(express.urlencoded({ limit: '50mb', extended: true }));  // Increase URL-encoded payload limit


const PORT = 8000;


app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));

// const USERNAME = process.env.DB_USERNAME;
// const PASSWORD = process.env.DB_PASSWORD;


Connection();