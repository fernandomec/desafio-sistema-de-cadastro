import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// 1. Desestrutura o Pool da biblioteca nativa do Postgres
const { Pool } = pg;

// 2. Cria o Pool de conexões usando a sua variável de ambiente
const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL 
});

// 3. Passa o Pool para o adaptador do Prisma
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });