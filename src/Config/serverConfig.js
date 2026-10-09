import dotenv from 'dotenv';

dotenv.config() // Load enviroment variables from .env file

export const PORT = parseInt(process.env.PORT) || 4000; 
export const MONGODB_URI = process.env.MONGODB_URI;
export const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'upthrust';