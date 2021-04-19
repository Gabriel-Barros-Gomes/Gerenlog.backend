const {
    serviceCreateProduct,
    serviceGetAllActiveProducts,
    serviceSafeDeleteProduct,
    serviceGetProductById,
    serviceUpdateProductById
} = require('./Product_service')

const { JWT } = require('../../../infrastructure/config/jwt')

const express = require('express')
const router = express.Router()

router.post('/create' , JWT, async ( req, res )=>{
    try{
        const response = await serviceCreateProduct(req.body)
        if(response === 'Product already exists'){
            console.log('Product already exists')
            res.status(500).send({error: "Product already exists"})
        }else{
            console.log(response)
            res.status(201).send(response)
        }
    }catch(e){
        res.status(500).send({error:"Failed to create product"})
        console.error(e,"Failed to create product")
    }
})

router.get('/findallactive' , JWT, async ( req, res )=>{
    try{
        const response = await serviceGetAllActiveProducts()
        if(response === "Error Products not found"){
            console.log("Error Products not found")
            res.send(500).send({error: "Error Products not found"})
        }else{
            console.log(response)
            res.status(200).send(response)
        }
    }catch(e){
        res.status(500).send({error:"products not Founds"})
        console.error(e,"products not Founds\n")
    }
})

router.get('/findbyid/:id' , JWT, async ( req, res )=>{
    try{
        const response = await serviceGetProductById(req.params.id)
        if(response === "Error Product Not Found"){
            console.log("Error Product Not Found")
            res.status(500).send({error: "Error Product Not Found"})
        }else{
            console.log(response)
            res.status(200).send(response)
        }
    }catch(e){
        res.status(500).send({error:"Error Product Not Found"})
        console.error(e,"Product not Found\n")
    }
})

router.delete('/deletebyid/:id' , JWT, async ( req, res )=>{
    try{
        const response = await serviceSafeDeleteProduct(req.params.id)
        if(response === "Error Product Not Found"){
            console.log("Error Product Not Found")
            res.status(500).send({error:"Error Product Not Found"})
        }else{
            console.log("Successfully Deleted")
            res.status(200).send({success: "Successfully Deleted"})
        }
    }catch(e){
        res.status(500).send({error:"Product not Found"})
        console.error(e,"Product not Found\n")
    }
})

router.put('/updatebyid/:id' , JWT, async ( req, res )=>{
    try{
        const response = await serviceUpdateProductById(req.params.id, req.body)
        if(response === "Error Product Not Found"){
            console.log("Error Product Not Found")
            res.status(500).send({error:"Error Product Not Found"})
        }else{
            console.log("Successfully Updated")
            res.status(200).send(response)
        }
    }catch(e){
        res.status(500).send({error:"Product not Found"})
        console.error(e,"Product not Found\n")
    }
})

module.exports = (app) => app.use('/api/products',router)