import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectDatabase } from './config/db';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, MixMatch Backend!');
});

// Start server after database connection
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
