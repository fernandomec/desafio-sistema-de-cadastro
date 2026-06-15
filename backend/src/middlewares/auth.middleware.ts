import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({ message: 'Acesso negado. TOKEN FALTANDO' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token INVÁLIDO' });
    }
};

export const roleMiddleware = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (req.user?.role !== requiredRole) {
            res.status(403).json({ message: 'Acesso PROIBIDO para esta ROLE' });
            return;
        }
        next();
    };
};