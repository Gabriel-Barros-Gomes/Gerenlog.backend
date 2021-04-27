const {
    serviceCreateCompany,
    serviceGetAllActiveCompany,
    serviceGetAllActiveProviderCompany,
    serviceSafeDeleteCompany,
    serviceGetCompanyById,
    serviceUpdateCompanyById
} = require('./Company_service')

const { JWT } = require('../../../infrastructure/config/jwt')

const express = require('express')
const router = express.Router()

router.post('/create' , JWT, async ( req, res )=>{
    try{
        const response = await serviceCreateCompany(req.body)
        if(response === 'Company already exists'){
            console.log('Company already exists')
            res.status(500).send({error: "Company already exists"})
        }else{
            console.log(response)
            res.status(201).send(response)
        }
    }catch(e){
        res.status(500).send({error:"Failed to create Company"})
        console.error(e,"Failed to create Company")
    }
})

router.get('/findallactive' , JWT, async ( req, res )=>{
    try{
        const response = await serviceGetAllActiveCompany()
        if(response === "Error Companies not found"){
            console.log("Error Companies not found")
            res.send(500).send({error: "Error Companies not found"})
        }else{
            console.log(response)
            res.status(200).send(response)
        }
    }catch(e){
        res.status(500).send({error:"Companies not Founds"})
        console.error(e,"Companies not Founds\n")
    }
})

router.get('/findallactiveprovidercompany' , JWT, async ( req, res )=>{
    try{
        const response = await serviceGetAllActiveProviderCompany()
        if(response === "Error Companies not found"){
            console.log("Error Companies not found")
            res.send(500).send({error: "Error Companies not found"})
        }else{
            console.log(response)
            res.status(200).send(response)
        }
    }catch(e){
        res.status(500).send({error:"Companies not Founds"})
        console.error(e,"Companies not Founds\n")
    }
})

router.get('/findbyid/:id' , JWT, async ( req, res )=>{
    try{
        const response = await serviceGetCompanyById(req.params.id)
        if(response === "Error Company Not Found"){
            console.log("Error Company Not Found")
            res.status(500).send({error: "Error Company Not Found"})
        }else{
            console.log(response)
            res.status(200).send(response)
        }
    }catch(e){
        res.status(500).send({error:"Error Company Not Found"})
        console.error(e,"Company not Found\n")
    }
})

router.delete('/deletebyid/:id' , JWT, async ( req, res )=>{
    try{
        const response = await serviceSafeDeleteCompany(req.params.id)
        if(response === "Error Company Not Found"){
            console.log("Error Company Not Found")
            res.status(500).send({error:"Error Company Not Found"})
        }else{
            console.log("Successfully Deleted")
            res.status(200).send({success: "Successfully Deleted"})
        }
    }catch(e){
        res.status(500).send({error:"Company not Found"})
        console.error(e,"Company not Found\n")
    }
})

router.put('/updatebyid/:id' , JWT, async ( req, res )=>{
    try{
        const response = await serviceUpdateCompanyById(req.params.id, req.body)
        if(response === "Error Company Not Found"){
            console.log("Error Company Not Found")
            res.status(500).send({error:"Error Company Not Found"})
        }else{
            console.log("Successfully Updated")
            res.status(200).send(response)
        }
    }catch(e){
        res.status(500).send({error:"Company not Found"})
        console.error(e,"Company not Found\n")
    }
})

module.exports = (app) => app.use('/api/companies',router)