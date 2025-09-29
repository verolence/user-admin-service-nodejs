import { Router } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

const router = Router();

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const { fullName, birthDate, email, password, role } = req.body;

    // Проверяем, есть ли уже такой email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email уже зарегистрирован' });
    }

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      birthDate,
      email,
      password: hashedPassword,
      role,
      status: 'active',
    });

    await newUser.save();

    res.status(201).json({ message: 'Пользователь зарегистрирован' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error });
  }
});

export default router;
