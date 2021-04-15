const { 
    serviceCreateUser,
    serviceGetAllActiveUsers,
    serviceGetUserByCpf,
    serviceSafeDeleteUser,
    serviceUpdateUserByCpf
 } = require('./User_service')

const { JWT } = require('../../../infrastructure/config/jwt')
const express = require('express')
const router = express.Router()

router.post('/create',  async ( req, res )=>{
    try{
        const response = await serviceCreateUser(req.body.cpf, req.body)
            if(response === 'User already exists'){
                console.log("User already exists")
                res.status(500).send({error: "User already exists"})
            }else{
                console.log(response)
                res.status(201).send(response)
            }
    }catch(e){
        res.status(500).send({error:"Failed to create user"})
        console.error(e,"Failed to create user")
    }
})

router.get('/findallactive', JWT , async ( req, res )=>{
    try{
        const response = await serviceGetAllActiveUsers()
            if(response === "Error Users Not Found"){
                console.log("Error Users Not Found")
                res.status(500).send({error: "Error Users Not Found"})
            }else{
                console.log(response)
                res.status(200).send(response)
            }
    }catch(e){
        res.status(500).send({error:"Error Users Not Found"})
        console.error(e,"Users not Founds\n")
    }
})

router.get('/findbycpf/:cpf', JWT , async ( req, res )=>{
    try{
        const response= await serviceGetUserByCpf( req.params.cpf )
            if(response === "Error User Not Found"){
                console.log("Error User Not Found")
                res.status(500).send({error: "Error User Not Found"})
            }else{
                console.log(response)
                res.status(200).send(response)
            }
    }catch(e){
        res.status(500).send({error:"User not Found"})
        console.error(e,"User not Found\n")
    }
})

router.delete('/deletebycpf/:cpf', JWT , async ( req, res )=>{
    try{
        const response = await serviceSafeDeleteUser(req.params.cpf)
            if(response === "Error User Not Found"){
                console.log("Error User Not Found")
                res.status(500).send({error:"Error User Not Found" })
            }else{
                console.log("Successfully Deleted")
                res.status(200).send({success: "Successfully Deleted"})
            }
    }catch(e){
        res.status(500).send({error:"User not Found"})
        console.error(e,"User not Found\n")
    }
})

router.put('/updatebycpf/:cpf', JWT , async ( req, res )=>{
    try{
        const response = await serviceUpdateUserByCpf(req.params.cpf, req.body)
            if(response === "Error User Not Found"){
                console.log("Error User Not Found")
                res.status(500).send({error:"Error User Not Found" })
            }else{
                console.log("Successfully Updated")
                res.status(200).send(response)
            }
    }catch(e){
        res.status(500).send({error:"User not Found"})
        console.error(e,"User not Found\n")
    }
})


module.exports = (app) => app.use('/api/users',router)