import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './docs/swagger.js';
import authRoutes from './routes/auth.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
app.use('/api/auth', authRoutes);

// teste
app.get('/', (req, res) => {
  res.json({ message: 'TESTE' });
});

// PORTA
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  console.log(`Swagger em: http://localhost:${PORT}/api-docs`);
});