const express = require('express')
const cors = require('cors')
const { json } = require('express')


const app = express()

async function serverConnect () {
    app.use(cors())
    app.use(json())
    require('./auth')(app)
    require('../helpers/verify_token')(app)
    require('../../domain/business/users/User_controller')(app)
    require('../../domain/business/products/Product_controller')(app)
    require('../../domain/business/employees/Employee_controller')(app)
    require('../../domain/business/companies/Company_controller')(app)

    await app.listen(process.env.server_port, ()=>{
        console.log(process.env.server_url)
    })
}

module.exports = {
    serverConnect
}