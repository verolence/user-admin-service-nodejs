import express from 'express';
import { User } from '../models/User';


const router = express.Router();

// данные пользователя по ID
// (req, res) => {} - функция-обработчик

router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// список всех пользователей
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // не возвращаем пароль
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;
