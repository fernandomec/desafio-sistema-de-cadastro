import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../services/prisma.js';

// validações zod, evita um monte de if
const registerSchema = z.object({
    name: z.string().min(1, 'O nome é obrigatório'),
    email: z.email('Email inválido'),
    password: z.string().min(6, 'A senha possui min de 6 caracteres'),
});

const loginSchema = z.object({
    email: z.email('Email inválido'),
    password: z.string().min(1, 'Senha obrigatória'),
});


const formatZodErrors = (error: z.ZodError) => {
    return error.issues.reduce((acc, issue) => {
        const field = issue.path[0] as string;
        if (!acc[field]) acc[field] = [];
        acc[field].push(issue.message);
        return acc;
    }, {} as Record<string, string[]>);
};

// controller de registro
export const register = async (req: Request, res: Response): Promise<void> => {
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
        res.status(400).json({ errors: formatZodErrors(validation.error) });
        return;
    }

    const data = validation.data;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email: data.email } });

        if (existingUser) {
            res.status(400).json({ message: 'Email duplicado, já em uso' });
            return;
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            },
        });

        res.status(201).json({ message: 'Usuário CADASTRADO com sucesso', userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'ERRO no servidor' });
    }
};

// controller de login
export const login = async (req: Request, res: Response): Promise<void> => {
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
        res.status(400).json({ errors: formatZodErrors(validation.error) });
        return;
    }

    const data = validation.data;

    try {
        const user = await prisma.user.findUnique({ where: { email: data.email } });

        if (!user) {
            res.status(400).json({ message: 'Credenciais INVÁLIDAS' });
            return;
        }
        if (!user.isActive) {
            res.status(400).json({ message: 'Usuário INATIVO' });
            return;
        }

        const isMatch = await bcrypt.compare(data.password, user.password);

        if (!isMatch) {
            res.status(400).json({ message: 'SENHA INCORRETA' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, message: 'Login BEM SUCEDIDO' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'ERRO NO SERVIDOR' });
    }
};