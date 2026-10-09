import mongoose from 'mongoose';
import {
  ADMIN_PASSWORD,
  JWT_SECRET,
  MONGODB_DB_NAME,
  MONGODB_URI,
  PORT,
} from './src/Config/serverConfig.js';
import { createApp } from './src/Config/appConfig.js';

async function startServer() {
  const missing = [];
  if (!MONGODB_URI) missing.push('MONGODB_URI');
  if (!ADMIN_PASSWORD) missing.push('ADMIN_PASSWORD');
  if (!JWT_SECRET) missing.push('JWT_SECRET');
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  if (ADMIN_PASSWORD.length < 16) {
    throw new Error('ADMIN_PASSWORD must be at least 16 characters long.');
  }
  if (JWT_SECRET.length < 24) {
    throw new Error('JWT_SECRET must be at least 24 characters long.');
  }

  await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB_NAME });
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Server startup failed:', error.message);
  process.exit(1);
});
