const {
    serviceCreateEmployee,
    serviceGetAllActiveEmployees,
    serviceSafeDeleteEmployee,
    serviceGetEmployeeById,
    serviceUpdateEmployeeById
} = require('./Employee_service')

const { JWT } = require('../../../infrastructure/config/jwt')

const express = require('express')
const router = express.Router()

router.post('/create' , JWT, async ( req, res )=>{
    try{
        const response = await serviceCreateEmployee(req.body)
        if(response === 'Employee already exists'){
            console.log('Employee already exists')
            res.status(500).send({error: "Employee already exists"})
        }else{
            console.log(response)
            res.status(201).send(response)
        }
    }catch(e){
        res.status(500).send({error:"Failed to create Employee"})
        console.error(e,"Failed to create Employee")
    }
})

router.get('/findallactive' , JWT, async ( req, res )=>{
    try{
        const response = await serviceGetAllActiveEmployees()
        if(response === "Error Employees not found"){
            console.log("Error Employees not found")
            res.send(500).send({error: "Error Employees not found"})
        }else{
            console.log(response)
            res.status(200).send(response)
        }
    }catch(e){
        res.status(500).send({error:"Employees not Founds"})
        console.error(e,"Employees not Founds\n")
    }
})

router.get('/findbyid/:id' , JWT, async ( req, res )=>{
    try{
        const response = await serviceGetEmployeeById(req.params.id)
        if(response === "Error Employee Not Found"){
            console.log("Error Employee Not Found")
            res.status(500).send({error: "Error Employee Not Found"})
        }else{
            console.log(response)
            res.status(200).send(response)
        }
    }catch(e){
        res.status(500).send({error:"Error Employee Not Found"})
        console.error(e,"Employee not Found\n")
    }
})

router.delete('/deletebyid/:id' , JWT, async ( req, res )=>{
    try{
        const response = await serviceSafeDeleteEmployee(req.params.id)
        if(response === "Error Employee Not Found"){
            console.log("Error Employee Not Found")
            res.status(500).send({error:"Error Employee Not Found"})
        }else{
            console.log("Successfully Deleted")
            res.status(200).send({success: "Successfully Deleted"})
        }
    }catch(e){
        res.status(500).send({error:"Employee not Found"})
        console.error(e,"Employee not Found\n")
    }
})

router.put('/updatebyid/:id' , JWT, async ( req, res )=>{
    try{
        const response = await serviceUpdateEmployeeById(req.params.id, req.body)
        if(response === "Error Employee Not Found"){
            console.log("Error Employee Not Found")
            res.status(500).send({error:"Error Employee Not Found"})
        }else{
            console.log("Successfully Updated")
            res.status(200).send(response)
        }
    }catch(e){
        res.status(500).send({error:"Employee not Found"})
        console.error(e,"Employee not Found\n")
    }
})

module.exports = (app) => app.use('/api/employees',router)