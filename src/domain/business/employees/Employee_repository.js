const { Employee } = require('./Employee_model')
const { sequelize , QueryTypes } = require('../../../infrastructure/config/database_config')

async function createEmployee( _employee ){
    try{
        return await Employee.create( _employee )
    }catch(e){
        console.error('Employee Failed to Create\n', e)
    }
}

async function findAllEmployeeActive(){
    try{
        return await sequelize.query('SELECT * FROM public."employees" WHERE active = true ORDER BY id ASC ', QueryTypes.SELECT)
    }catch(e){
        console.error('Employees not Founds\n', e)
    }
}

async function findEmployeeById( _id ){
    try{
        return await Employee.findByPk( _id )
    }catch(e){
        console.error('Employees not Founds\n', e)
    }
}

async function findEmployeeByName( _name ){
    try {
        return await Employee.findOne( {where:{
            name: _name
        }} )
    } catch (e) {
        console.error('Employee not Found', e)
    }
}

async function safeDeleteEmployeeById( _id ){
    try{
        const employeeToDelete = await Employee.findByPk( _id )
        if(employeeToDelete  === null || employeeToDelete === undefined){
            return "Error Employee Not Found"
        }else{
            employeeToDelete.dataValues.active = false
            return await Employee.update( employeeToDelete.dataValues , {where:{
                id:_id
            }})
        }
    }catch(e){
        console.error('Failed to Delete', e)
        return "Error Employee Not Found"
    }
}

async function updateEmployeeById( _id, _employee ){
    try{
        const employeeToUpdate = await Employee.findByPk( _id )
        if(employeeToUpdate  === null || employeeToUpdate === undefined){
            return "Error Employee Not Found"
        }else{
            return await employeeToUpdate.update( _employee, {where:{
                id: _id
            }} )
        }
    }catch(e){
        console.error('Failed to Update', e)
        return "Error Employee Not Found"
    }
}
module.exports = {
    createEmployee,
    findAllEmployeeActive,
    findEmployeeByName,
    findEmployeeById,
    safeDeleteEmployeeById,
    updateEmployeeById
}
