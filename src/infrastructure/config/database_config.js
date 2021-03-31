const { Sequelize, DataTypes , QueryTypes } = require('sequelize')


const sequelize = new Sequelize(process.env.database,process.env.database_username, process.env.database_password, {
    host: process.env.database_host,
    dialect: 'postgres',
    port:process.env.database_port
  })

async function databaseMigrate(){ 
    await sequelize.sync({ force: true }) 
}

  module.exports = {
      sequelize,
      DataTypes,
      databaseMigrate,
      QueryTypes
  }