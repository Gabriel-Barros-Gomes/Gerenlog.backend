const { sequelize, DataTypes } = require('../../../infrastructure/config/database_config')

const Company = sequelize.define('companies', {
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
        unique:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    cnpj:{
        type:DataTypes.STRING,
        allowNull:false
    },
    site:{
        type:DataTypes.STRING,
        allowNull:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    company_code:{
        type:DataTypes.STRING,
        allowNull:true
    },
    registration_date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    phone_number:{
        type:DataTypes.STRING,
        allowNull:true
    },
    cep:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    house:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    invoice:{
        type:DataTypes.STRING,
        allowNull:false
    },
    contract:{
        type:DataTypes.STRING,
        allowNull:false
    },
    provider:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    active:{
        type:DataTypes.BOOLEAN
    }

})

module.exports = {
    Company
}