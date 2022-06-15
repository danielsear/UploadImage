const Sequelize = require('sequelize')

const db = require('./db')

const Image = db.define('images', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  image: {
    type: Sequelize.STRING
  }
})

//Comando criar tabela, usar uma vez
//Image.sync()

//comando para excluir tabela
//Image.drop()

module.exports = Image
