import express from 'express';
import usersRouter from './routes/users';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, MixMatch Backend!');
});

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log('Protected endpoint available at: GET /users/me (requires Authorization: Bearer <token>)');
});
