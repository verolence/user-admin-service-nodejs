import express from 'express';
import { connectDB } from './db';
import authRoutes from './routes/auth';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(express.json());

app.use('/api/auth', authRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};

startServer();
