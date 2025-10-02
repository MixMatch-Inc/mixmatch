import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import usersRouter from './routes/users';
import { connectDatabase } from './config/db';
import authRoutes from './routes/auth.routes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello, MixMatch Backend!');
});

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log('Protected endpoint available at: GET /users/me (requires Authorization: Bearer <token>)');
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
