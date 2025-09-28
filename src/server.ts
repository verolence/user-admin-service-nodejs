import express from 'express';
import { connectDB } from './db';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const startServer = async () => {
  await connectDB(); // <-- сначала подключаем БД
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};

startServer();
