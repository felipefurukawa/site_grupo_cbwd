const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Cliente, Pedido } = require('./models');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rotas para Clientes
app.get('/clientes', async (req, res) => {
  const clientes = await Cliente.findAll({ include: 'pedidos' });
  res.json(clientes);
});

app.post('/clientes', async (req, res) => {
  const { nome, endereco, signoZodiaco } = req.body;
  const cliente = await Cliente.create({ nome, endereco, signoZodiaco });
  res.json(cliente);
});

app.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, endereco, signoZodiaco } = req.body;
  const cliente = await Cliente.findByPk(id);
  await cliente.update({ nome, endereco, signoZodiaco });
  res.json(cliente);
});

app.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  await Cliente.destroy({ where: { id } });
  res.json({ message: 'Cliente deletado' });
});

// Rotas para Pedidos
app.get('/pedidos', async (req, res) => {
  const pedidos = await Pedido.findAll();
  res.json(pedidos);
});

app.post('/clientes/:clienteId/pedidos', async (req, res) => {
  const { clienteId } = req.params;
  const { tipoQueijo, dataValidade, fazenda } = req.body;
  const pedido = await Pedido.create({ tipoQueijo, dataValidade, fazenda, ClienteId: clienteId });
  res.json(pedido);
});

app.put('/pedidos/:id', async (req, res) => {
  const { id } = req.params;
  const { tipoQueijo, dataValidade, fazenda } = req.body;
  const pedido = await Pedido.findByPk(id);
  await pedido.update({ tipoQueijo, dataValidade, fazenda });
  res.json(pedido);
});

app.delete('/pedidos/:id', async (req, res) => {
  const { id } = req.params;
  await Pedido.destroy({ where: { id } });
  res.json({ message: 'Pedido deletado' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
