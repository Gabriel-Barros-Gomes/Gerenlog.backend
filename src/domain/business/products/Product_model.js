const { sequelize, DataTypes } = require('../../../infrastructure/config/database_config')

const Product = sequelize.define('product', {
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
    type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    },
    unit_measurement:{
        type:DataTypes.STRING,
        allowNull:false
    },
    expiration_date:{
        type:DataTypes.DATE,
        allowNull:true
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