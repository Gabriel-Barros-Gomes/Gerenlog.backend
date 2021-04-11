const { sequelize, DataTypes } = require('../../../infrastructure/config/database_config')

const Product = sequelize.define('Product', {
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
    quantity:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    productCode:{
        type:DataTypes.STRING,
        allowNull:true
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    active:{
        type:DataTypes.BOOLEAN
    }

})

module.exports = {
    Product
}