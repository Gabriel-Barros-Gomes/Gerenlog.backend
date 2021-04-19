const { 
    createProduct,
    findAllProductActive,
    findProductById,
    findProductByName,
    safeDeleteProductById,
    updateProductById
 } = require('./Product_repository')


const serviceCreateProduct = async ( _product ) => {
    try{
        let verify = await findProductByName( _product.name )
        console.log(verify)

        if(!(verify === null || verify === undefined )){
            console.error('Product already exists')
            return "Product already exists"
        }else{
            return await createProduct( _product ) 
        }
    }catch(e){
        console.error(e)
        return "Product already exists"
    }
}

const serviceGetAllActiveProducts = async () => {
    try {
        const activeProducts = await findAllProductActive()
        if(activeProducts === null || activeProducts === undefined){
            return "Error Products not found"
        }else{
            return activeProducts[0]
        }
    } catch (e) {
        console.error(e)
        return "Error Products not found"
    }
}

const serviceGetProductById = async ( _id ) => {
    try {
        const product = await findProductById( _id )
        if(product === null || product === undefined){
            console.log("Error Product Not Found")
            return "Error Product Not Found"
        }else{
            return product
        }
    } catch (e) {
        console.error(e)
        return "Error Product Not Found"
    }
}

const serviceSafeDeleteProduct = async ( _id ) => {
    try {
        const deleted = await safeDeleteProductById( _id )
        if(deleted === "Error Product Not Found"){
            return "Error Product Not Found"
        }else{
            return "Successfully Deleted"
        }

    } catch (e) {
        console.error(e)
        return "Error Product Not Found"
    }
}

const serviceUpdateProductById = async ( _id, _product ) => {
    try {
        const updated = await updateProductById ( _id, _product )
        if(updated === "Error Product Not Found"){
            return "Error Product Not Found"
        }else{
            return updated
        }
    } catch (e) {
        console.error(e)
        return "Error Product Not Updated"
    }
}

module.exports = {
    serviceCreateProduct,
    serviceGetAllActiveProducts,
    serviceGetProductById,
    serviceSafeDeleteProduct,
    serviceUpdateProductById
}
