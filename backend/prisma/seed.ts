import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcryptjs';

// adapter do prisma para usar o pool do pg nativo (prisma 7)
const { Pool } = pg;
const connectionString = process.env.DATABASE_URL as string;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('INICIADO SEED...');

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@gmail.com' },
        update: {}, // caso já exista, não faz nmda
        create: {
            name: 'fernandomec',
            email: 'admin@gmail.com',
            password: hashedPassword,
            role: 'admin',
        },
    });

    console.log('SUCESSO');
    console.log({ adminUser });
}

// rodar o seed e garantir que o prisma e o pool desconectem no final
main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) => {
        console.error('Erro ao rodar o seed:', e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });