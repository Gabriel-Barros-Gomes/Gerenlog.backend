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
        return await sequelize.query('SELECT * FROM public."products" WHERE active = true ORDER BY id ASC ', QueryTypes.SELECT)
    }catch(e){
        console.error('Products not Founds\n', e)
    }
}

async function findProductById( _id ){
    try{
        return await Product.findByPk( _id )
    }catch(e){
        console.error('Products not Founds\n', e)
    }
}

async function findProductByName( _name ){
    try {
        return await Product.findOne( {where:{
            name: _name
        }} )
    } catch (e) {
        console.error('Product not Found', e)
    }
}

async function safeDeleteProductById( _id ){
    try{
        const productToDelete = await Product.findByPk( _id )
        if(productToDelete  === null || productToDelete === undefined){
            return "Error Product Not Found"
        }else{
            productToDelete.dataValues.active = false
            return await Product.update( productToDelete.dataValues , {where:{
                id:_id
            }})
        }
    }catch(e){
        console.error('Failed to Delete', e)
        return "Error Product Not Found"
    }
}

async function updateProductById( _id, _product ){
    try{
        const productToUpdate = await Product.findByPk( _id )
        if(productToUpdate  === null || productToUpdate === undefined){
            return "Error Product Not Found"
        }else{
            return await productToUpdate.update( _product, {where:{
                id: _id
            }} )
        }
    }catch(e){
        console.error('Failed to Update', e)
        return "Error Product Not Found"
    }
}
module.exports = {
    createProduct,
    findAllProductActive,
    findProductByName,
    findProductById,
    safeDeleteProductById,
    updateProductById
}
