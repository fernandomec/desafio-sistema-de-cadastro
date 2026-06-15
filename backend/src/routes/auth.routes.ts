import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Rotas públicas
router.post('/register', register);
router.post('/login', login);

// Exemplos de rotas protegidas
router.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'Você está autenticado!', user: req.user });
});

router.get('/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.json({ message: 'Bem-vindo ao painel de admin!', user: req.user });
});

export default router;