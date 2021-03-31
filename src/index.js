require('dotenv').config()

const { sequelize, databaseMigrate } = require('./infrastructure/config/database_config')
const { serverConnect } = require('./infrastructure/config/server_config')

try{
    sequelize.authenticate()
    //databaseMigrate() //this only will be activate to migrate database tables
    console.log('Database connected')
}catch(e){
    console.error(e,'Database connection failed')
}

try{
    serverConnect()
    console.log('Server connected')
}catch(e){
    console.error(e,'Server connection failed')
}
