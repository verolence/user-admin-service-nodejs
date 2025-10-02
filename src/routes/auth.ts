import { Router } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET!;

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
      role
    });

    await newUser.save();

    res.status(201).json({ message: 'Пользователь зарегистрирован' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error });
  }
});

// Логин пользователя
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Находим пользователя по email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Неверный email или пароль' });

    // Сравниваем пароли
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Неверный email или пароль' });

    // Генерируем JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});


export default router;
