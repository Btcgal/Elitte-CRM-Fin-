const dotenv = require('dotenv');
dotenv.config(); // Garante que as variáveis de ambiente sejam carregadas primeiro

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('./config/passport-setup'); // Executa a configuração do Passport

const app = express();
const port = process.env.PORT || 3000;

// Importação das rotas
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');

// Middlewares essenciais
app.use(cors({
  origin: 'http://localhost:3000', // Permite requisições do seu frontend
  credentials: true,
}));
app.use(express.json());
app.use(session({
  secret: process.env.COOKIE_KEY || 'uma_chave_secreta_de_fallback_muito_longa',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 horas
}));
app.use(passport.initialize());
app.use(passport.session());

// Registro das rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);

// Rota de verificação
app.get('/', (req, res) => {
  res.send('Backend do CRM Financeiro está no ar e configurado corretamente!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
