const { sequelize, DataTypes } = require('../../../infrastructure/config/database_config')

const User = sequelize.define('user', {
    cpf:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
        unique:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    last_name:{
        type:DataTypes.STRING,
        allowNull:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    service_code:{
        type:DataTypes.STRING,
        allowNull:false
    },
    user_type:{
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