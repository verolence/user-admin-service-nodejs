import express from 'express';
import { User } from '../models/User';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// данные пользователя по ID
// (req, res) => {} - функция-обработчик
// authMiddleware - middleware функция, которая выполняется до обработчика, она вызывает next(), либо возвращает ошибку
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const currentUser = (req as any).user;

    const userId = req.params.id;

    if (currentUser?.userId !== userId && currentUser?.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.post('/:id/block', authMiddleware, async (req, res) => {
  try {
    const currentUser = (req as any).user;

    const userId = req.params.id;

    if (currentUser?.userId !== userId && currentUser?.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    user.isActive = false;
    await user.save();
    res.json({ message: 'Пользователь заблокирован' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.post('/:id/reactivate', authMiddleware, async (req, res) => {
  try {
    const currentUser = (req as any).user;

    const userId = req.params.id;

    if (currentUser?.userId !== userId && currentUser?.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    user.isActive = true;
    await user.save();
    res.json({ message: 'Пользователь разблокирован' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// список всех пользователей
router.get('/', authMiddleware, async (req, res) => {
  try {
    const currentUser = (req as any).user;

    if (currentUser?.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    const users = await User.find().select('-password'); // не возвращаем пароль
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;
