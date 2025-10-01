import express from 'express';
import 'dotenv/config';
import { connectDB } from './db';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';


const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};

startServer();
