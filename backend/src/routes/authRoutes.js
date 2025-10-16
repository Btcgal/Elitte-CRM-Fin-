const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

// CORREÇÃO AQUI: Importando o Prisma do local correto
// O caminho correto a partir de 'src/routes/' é '../generated/prisma'
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// Rota de Registro
// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, password, name } = req.body;

    // 1. Validação básica
    if (!username || !password || !name) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // 2. Checa se o usuário já existe (usando Prisma)
    const existingUser = await prisma.user.findUnique({
      where: { username: username },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Este nome de usuário já está em uso.' });
    }

    // 3. Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Cria e salva o novo usuário (usando Prisma)
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        name: name,
      },
    });

    // Remove a senha da resposta por segurança
    const userResponse = {
      id: newUser.id,
      name: newUser.name,
      username: newUser.username
    };

    res.status(201).json({ message: 'Usuário registrado com sucesso!', user: userResponse });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
  }
});

// Rota de Login (código que já tínhamos)
// POST /api/auth/login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message || 'Credenciais inválidas' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      
      const userResponse = {
        id: user.id,
        name: user.name,
        username: user.username
      };

      return res.status(200).json({ message: 'Login realizado com sucesso!', user: userResponse });
    });
  })(req, res, next);
});


module.exports = router;
