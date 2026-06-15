// src/docs/swagger.ts

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API de Autenticação e Usuários',
    version: '1.0.0',
    description: 'Testes de Autenticação e usuários usando Node.js, Express, Prisma e JWT',
  },
  servers: [
    {
      url: 'http://localhost:300',
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
    '/api/auth/register': {
      post: {
        summary: 'Registra um novo usuário',
        tags: ['Autenticação'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'João da Silva' },
                  email: { type: 'string', example: 'joao@email.com' },
                  password: { type: 'string', example: '123456' },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Usuário cadastrado com sucesso' },
          '400': { description: 'Erro de validação ou email em uso' },
          '500': { description: 'Erro no servidor' },
        },
      },
    },
    '/api/auth/login': {
      post: {
        summary: 'Faz o login do usuário',
        tags: ['Autenticação'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', example: 'joao@email.com' },
                  password: { type: 'string', example: '123456' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Login bem sucedido (Retorna o Token)' },
          '400': { description: 'Credenciais inválidas' },
          '500': { description: 'Erro no servidor' },
        },
      },
    },
  },
};