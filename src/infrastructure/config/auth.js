const { User } = require('../../domain/business/users/user_model')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const CryptoJS = require("crypto-js")

router.post('/login', async (req, res) =>{
try{

    let _user = await User.findOne({where:{
        cpf: req.body.cpf,
        user_type: req.body.user_type,
        service_code: req.body.service_code
    }})

    if(_user == null || _user == undefined){
        res.status(401).send({auth:"unauthorized", error:"user not found"})
    }

    let bytes = CryptoJS.AES.decrypt(_user.password, process.env.password_secret)
    let decriptedPassword = bytes.toString(CryptoJS.enc.Utf8)

    if(!(decriptedPassword == req.body.password)){
        _user = null
    }

    if(_user == null || _user == undefined){
        res.status(401).send({auth:"unauthorized", error:"password doesn't match!"})
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