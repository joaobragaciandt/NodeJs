const DataTypes = require('sequelize')
const User = require('./User')

const db = require('../db/conn')

const Address = db.define('Address',{
    name: {
        type: DataTypes.STRING,
        required: true
    },
    street: {
        type: DataTypes.STRING,
        required: true
    },
    city: {
        type: DataTypes.STRING,
        required: true
    },
})

User.hasMany(Address)
Address.belongsTo(User, {foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

module.exports = Address