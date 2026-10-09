import express from 'express';
import mongoose from 'mongoose';
import { MONGODB_DB_NAME, MONGODB_URI, PORT } from './src/Config/serverConfig.js';
import apiLeads from './src/routes/apiLeads.js';

const app = express();

app.use(express.json({ limit: '16kb' }));

app.use('/api/Leads', apiLeads);
app.use('/api', (req, res) => res.status(404).json({ ok: false, message: 'Not found' }));
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

async function startServer() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI must be set before starting the server.');
  }

  await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB_NAME });
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Server startup failed:', error.message);
  process.exitCode = 1;
});
