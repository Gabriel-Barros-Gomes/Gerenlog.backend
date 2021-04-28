const { JWT } = require('../config/jwt')

const express = require('express')
const router = express.Router()

router.get('/verify-token', JWT , async ( req, res ) =>{
    try {
        res.status(200).send({"status":"Token valid"})
    } catch (e) {
        res.status(500).send({"status":"Token invalid"})
        console.error(e)
    }
})

module.exports = (app) => app.use('/api/helpers', router)