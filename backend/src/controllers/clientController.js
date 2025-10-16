const prisma = require('../lib/prisma'); // Caminho corrigido

const getAllClients = async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(clients);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ message: 'Erro interno ao buscar clientes.' });
  }
};

const createClient = async (req, res) => {
  const { name, email, phone, type, ...specificData } = req.body;

  if (!name || !email || !type) {
    return res.status(400).json({ message: 'Nome, e-mail e tipo são obrigatórios.' });
  }

  try {
    const newClient = await prisma.client.create({
      data: {
        name,
        email,
        phone,
        type,
        ...specificData,
      },
    });
    res.status(201).json(newClient);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ message: 'Erro ao criar cliente.' });
  }
};

module.exports = { getAllClients, createClient };
