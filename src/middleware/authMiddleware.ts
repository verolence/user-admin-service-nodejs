import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export interface UserTokenPayload {
  userId: string;
  role: 'admin' | 'user';
}

// передача токена из заголовка authorization в запрос req
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

    if (!token) return res.status(401).json({ message: 'Не передан токен авторизации' });

    const decoded = jwt.verify(token, JWT_SECRET) as UserTokenPayload;

    (req as any).user = decoded;

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Передан неверный токен авторизации' });
  }
};
