const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
app.use(express.json());

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Order = sequelize.define('Order', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Order.hasMany(Product, { as: 'products' });
Product.belongsTo(Order);

sequelize.sync();

app.get('/api/orders', async (req, res) => {
  const orders = await Order.findAll({ include: 'products' });
  res.json(orders);
});

app.get('/api/orders/:id', async (req, res) => {
  const order = await Order.findByPk(req.params.id, { include: 'products' });
  res.json(order);
});

app.post('/api/orders', async (req, res) => {
  const order = await Order.create(req.body, { include: 'products' });
  res.json(order);
});

app.put('/api/orders/:id', async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  await order.update(req.body);
  await order.setProducts(req.body.products);
  res.json(order);
});

app.delete('/api/orders/:id', async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  await order.destroy();
  res.sendStatus(204);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
