const { User } = require('../../domain/business/users/user_model')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

router.post('/login', async (req, res) =>{
try{
    const _user = await User.findOne({where:{
        cpf: req.body.cpf,
        password: req.body.password,
        serviceCode: req.body.serviceCode
    }})
    if(_user == null){
        res.status(401).send({auth:"unauthorized", error:"user not found"})
    }
    else{
        const token = jwt.sign({id: _user.id} ,process.env.secret, {expiresIn:600}, (err,token) => {
            res.json({
                token: token,
                user: _user
            })
        })
    }
        
    
}catch(e){
    console.error('Error:', e)
    res.status(401)
}   

})

module.exports = (app) => app.use('/api/auth', router)