import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// middleware parser de json
app.use(express.json());

// teste de rota
app.get('/', (req, res) => {
  res.json({ message: 'teste' });
});

// porta do servvidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}, https://localhost:${PORT}`);
});