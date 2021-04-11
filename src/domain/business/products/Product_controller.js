const {
    createProduct,
    findAllProductActive,
    findProductById,
    safeDeleteProductById,
    updateProductById
} = require('./Product_repository')

const { JWT } = require('../../../infrastructure/config/jwt')

const express = require('express')
const router = express.Router()

router.post('/create' , JWT, async ( req, res )=>{
    try{
        const product = await createProduct(req.body)
        res.status(201).send(product)
    }catch(e){
        res.status(500).send({
            error:{
                message:"Failed to create product"
            }
        })
        console.error(e,"Failed to create product")
    }
})

router.get('/findallactive' , JWT, async ( req, res )=>{
    try{
        const activeProducts = await findAllProductActive()
        res.status(200).send(activeProducts[0])
        
    }catch(e){
        res.status(500).send({
            error:{
                message:"products not Founds"
            }
        })
        console.error(e,"products not Founds\n")
    }
})

router.get('/findbyid/:productid' , JWT, async ( req, res )=>{
    try{
        const product = await findProductById( req.params.productid )
        res.status(200).send(product)
    }catch(e){
        res.status(500).send({
            error:{
                message:"Product not Found"
            }
        })
        console.error(e,"Product not Found\n")
    }
})

router.delete('/deletebyid/:productid' , JWT, async ( req, res )=>{
    try{
        const productToDelete = await safeDeleteProductById(req.params.productid)
        res.status(200).send({
            deleted:"true"
        })
    }catch(e){
        res.status(500).send({
            error:{
                message:"Product not Found",
                error:"Not deleted"
            }
        })
        console.error(e,"Product not Found\n")
    }
})

router.put('/updatebyid/:productid' , JWT, async ( req, res )=>{
    try{
        const productToUpdate = await updateProductById(req.params.Productid)
        res.status(200).send(productToUpdate)
    }catch(e){
        res.status(500).send({
            error:{
                message:"Product not Found",
                error:"Not updated"
            }
        })
        console.error(e,"Product not Found\n")
    }
})

module.exports = (app) => app.use('/api/products',router)