const {
    createUser, 
    findAllUserActive,
    findUserById,
    updateUserById,
    safeDeleteUserById
} = require('./User_repository')

const express = require('express')
const router = express.Router()

router.post('/create', async ( req, res )=>{
    try{
        const user = await createUser(req.body)
        res.status(201).send(user)
    }catch(e){
        res.status(500).send({
            error:{
                message:"Failed to create user"
            }
        })
        console.error(e,"Failed to create user")
    }
})

router.get('/findallactive', async ( req, res )=>{
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

router.get('/findbyid/:userid', async ( req, res )=>{
    try{
        const user = await findUserById( req.params.userid )
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

router.delete('/deletebyid/:userid', async ( req, res )=>{
    try{
        const userToDelete = await safeDeleteUserById(req.params.userid)
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

router.put('/updatebyid/:userid', async ( req, res )=>{
    try{
        const userToUpdate = await updateUserById(req.params.userid)
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