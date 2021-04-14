const {
    findAllUserActive,
    findUserByCpf,
    updateUserByCpf,
    safeDeleteUserByCpf
} = require('./User_repository')

const { serviceCreateUser } = require('./User_service')

const { JWT } = require('../../../infrastructure/config/jwt')
const express = require('express')
const router = express.Router()

router.post('/create',  async ( req, res )=>{
    try{

        const response = await serviceCreateUser(req.body.cpf, req.body)
        res.status(201).send(response)

    }catch(e){
        res.status(500).send({
            error:{
                message:"Failed to create user"
            }
        })
        console.error(e,"Failed to create user")
    }
})

router.get('/findallactive', JWT , async ( req, res )=>{
    try{
        const activeUsers = await findAllUserActive()
        res.status(200).send(activeUsers[0])
        
    }catch(e){
        res.status(500).send({
            error:{
                message:"Users not Founds"
            }
        })
        console.error(e,"Users not Founds\n")
    }
})

router.get('/findbycpf/:cpf', JWT , async ( req, res )=>{
    try{
        const user = await findUserByCpf( req.params.cpf )
        res.status(200).send(user)
    }catch(e){
        res.status(500).send({
            error:{
                message:"User not Found"
            }
        })
        console.error(e,"User not Found\n")
    }
})

router.delete('/deletebycpf/:cpf', JWT , async ( req, res )=>{
    try{
        const userToDelete = await safeDeleteUserByCpf(req.params.cpf)
        res.status(200).send({
            deleted:"true"
        })
    }catch(e){
        res.status(500).send({
            error:{
                message:"User not Found",
                error:"Not deleted"
            }
        })
        console.error(e,"User not Found\n")
    }
})

router.put('/updatebycpf/:cpf', JWT , async ( req, res )=>{
    try{
        const userToUpdate = await updateUserByCpf(req.params.cpf)
        res.status(200).send(userToUpdate)
    }catch(e){
        res.status(500).send({
            error:{
                message:"User not Found",
                error:"Not updated"
            }
        })
        console.error(e,"User not Found\n")
    }
})


module.exports = (app) => app.use('/api/users',router)