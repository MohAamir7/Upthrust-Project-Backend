import dotenv from 'dotenv';

dotenv.config() // Load enviroment variables from .env file

export const PORT = parseInt(process.env.PORT) || 4000; 
export const MONGODB_URI = process.env.MONGODB_URI;
export const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'upthrust';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const JWT_SECRET = process.env.JWT_SECRET;
export const CLIENT_ORIGINS = (
  process.env.CLIENT_ORIGINS ||
  'http://localhost:5173,http://127.0.0.1:5173'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);