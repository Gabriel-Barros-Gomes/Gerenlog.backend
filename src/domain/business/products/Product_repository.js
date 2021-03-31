const { Product } = require('./Product_model')
const { sequelize , QueryTypes } = require('../../../infrastructure/config/database_config')

async function createProduct( _product ){
    try{
        return await Product.create( _product )
    }catch(e){
        console.error('Product Failed to Create\n', e)
    }
}

async function findAllProductActive(){
    try{
        return await sequelize.query('SELECT * FROM public."Products" WHERE active = true ORDER BY id ASC ', QueryTypes.SELECT)
    }catch(e){
        console.error('Products not Founds\n', e)
    }
}

async function findProductById( _productid ){
    try{
        return await Product.findByPk( _productid)
    }catch(e){
        console.error('Product not Founds\n', e)
    }
}

async function safeDeleteProductById( _productid ){
    try{
        const productToDelete = await Product.findByPk( _productid )
        productToDelete.dataValues.active = false
        return await Product.update( productToDelete.dataValues , {where:{
            id:_productid
        }})
    }catch(e){
        console.error('Failed to Delete', e)
    }
}

async function updateProductById( _productid ){
    try{
        const productToUpdate = await Product.findByPk( _productid )
        return await Product.update( productToUpdate.dataValues , {where:{
            id:_productid
        }})
    }catch(e){
        console.error('Failed to Update', e)
    }
}
module.exports = {
    createProduct,
    findAllProductActive,
    findProductById,
    safeDeleteProductById,
    updateProductById
}