const Sequelize = require('sequelize')

const sequelize = new Sequelize('celkeimage', 'root', 'maria007', {
  host: 'localhost',
  dialect: 'mysql'
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados realizado com sucesso')
  })
  .catch(err => console.error(err))

module.exports = sequelize
