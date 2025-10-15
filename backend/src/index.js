const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const searchRoutes = require('./routes/searchRoutes');

app.use(express.json());

app.use('/api', searchRoutes);

app.get('/', (req, res) => {
  res.send('Backend do CRM Financeiro está no ar!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
