const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize','root','root', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize