// src/docs/swagger.ts

export const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'API de Autenticação e Usuários',
        version: '1.0.0',
        description: 'Autenticação e gerenciamento de usuários usando Node.js, Express, Prisma e JWT',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Porta Local',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    paths: {
        '/api/auth/cadastrar': {
            post: {
                summary: 'Cadastra um novo usuário',
                tags: ['Autenticação'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['name', 'email', 'password'],
                                properties: {
                                    name: { type: 'string', example: 'fernandomec' },
                                    email: { type: 'string', example: 'admin@gmail.com' },
                                    password: { type: 'string', example: 'admin123' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    '201': { description: 'Usuário CADASTRADO SUCESSO' },
                    '400': { description: 'ERRO de validação ou e-mail já em uso' },
                    '500': { description: 'ERRO no servidor' },
                },
            },
        },
        '/api/auth/entrar': {
            post: {
                summary: 'Login de usuário',
                tags: ['Autenticação'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['email', 'password'],
                                properties: {
                                    email: { type: 'string', example: 'admin@gmail.com' },
                                    password: { type: 'string', example: 'admin123' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    '200': { description: 'Login OK' },
                    '400': { description: 'Dados inválidos ou usuário inativo' },
                    '500': { description: 'ERRO no servidor' },
                },
            },
        },
        '/api/auth/perfil': {
            get: {
                summary: 'Retorna os dados do usuário autenticado',
                tags: ['Usuário'],
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': {
                        description: 'Dados do usuário',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        user: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'string', example: 'clx0abc123' },
                                                name: { type: 'string', example: 'fernandomec' },
                                                email: { type: 'string', example: 'admin@gmail.com' },
                                                role: { type: 'string', example: 'admin' },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    '401': { description: 'Token inválido' },
                    '404': { description: 'Usuário não encontrado' },
                    '500': { description: 'ERRO no servidor' },
                },
            },
        },
        '/api/auth/admin/painel': {
            get: {
                summary: 'Acesso exclusivo para administradores',
                tags: ['Admin'],
                security: [{ bearerAuth: [] }],
                responses: {
                    '200': { description: 'Acesso OK' },
                    '401': { description: 'Token inválido' },
                    '403': { description: 'Acesso negado, role incorreta' },
                    '500': { description: 'ERRO no servidor' },
                },
            },
        },
    },
};