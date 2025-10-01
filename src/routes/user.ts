import express from 'express';
import { User } from '../models/User';

const router = express.Router();

// данные пользователя по ID (только админ или сам пользователь)
// (req, res) => {} - функция-обработчик
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUser = (req as any).user;

    if (currentUser.role !== 'admin' && currentUser.userId !== userId) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;
