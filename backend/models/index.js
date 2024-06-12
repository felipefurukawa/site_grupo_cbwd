// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Cliente = sequelize.define('Cliente', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  signoZodiaco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Pedido = sequelize.define('Pedido', {
  tipoQueijo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataValidade: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fazenda: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Cliente.hasMany(Pedido, { as: 'pedidos', foreignKey: 'ClienteId', onDelete: 'CASCADE' });
Pedido.belongsTo(Cliente, { foreignKey: 'ClienteId', onDelete: 'CASCADE' });

sequelize.sync({ alter: true });

module.exports = { Cliente, Pedido, sequelize };
