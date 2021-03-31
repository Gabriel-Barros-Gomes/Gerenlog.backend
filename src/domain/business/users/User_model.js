const { sequelize, DataTypes } = require('../../../infrastructure/config/database_config')

const User = sequelize.define('User', {
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
        unique:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    cpf:{
        type:DataTypes.STRING,
        allowNull:false
    },
    serviceCode:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    active:{
        type:DataTypes.BOOLEAN
    }
})

module.exports = {
    User
}