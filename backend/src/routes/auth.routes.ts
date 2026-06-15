import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware';
import { prisma } from '../services/prisma';

const router = Router();

// public routes
router.post('/cadastrar', register);
router.post('/entrar', login);

// nome, email, role
router.get('/perfil', authMiddleware, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user!.id },
            select: { id: true, name: true, email: true, role: true },
        });

        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'ERRO no servidor' });
    }
});

// rota protegida por role de admin
router.get('/admin/painel', authMiddleware, roleMiddleware('admin'), (req, res) => {
    res.json({ message: 'Bem-vindo ao painel de admin!', user: req.user });
});

export default router;