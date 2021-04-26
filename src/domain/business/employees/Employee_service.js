const { 
    createEmployee,
    findAllEmployeeActive,
    findEmployeeById,
    findEmployeeByName,
    safeDeleteEmployeeById,
    updateEmployeeById
 } = require('./Employee_repository')


const serviceCreateEmployee = async ( _employee ) => {
    try{
        let verify = await findEmployeeByName( _employee.name )
        console.log(verify)

        if(!(verify === null || verify === undefined )){
            console.error('Employee already exists')
            return "Employee already exists"
        }else{
            return await createEmployee( _employee ) 
        }
    }catch(e){
        console.error(e)
        return "Employee already exists"
    }
}

const serviceGetAllActiveEmployees = async () => {
    try {
        const activeEmployees = await findAllEmployeeActive()
        if(activeEmployees === null || activeEmployees === undefined){
            return "Error Employees not found"
        }else{
            return activeEmployees[0]
        }
    } catch (e) {
        console.error(e)
        return "Error Employees not found"
    }
}

const serviceGetEmployeeById = async ( _id ) => {
    try {
        const employee = await findEmployeeById( _id )
        if(employee === null || employee === undefined){
            console.log("Error Employee Not Found")
            return "Error Employee Not Found"
        }else{
            return employee
        }
    } catch (e) {
        console.error(e)
        return "Error Employee Not Found"
    }
}

const serviceSafeDeleteEmployee = async ( _id ) => {
    try {
        const deleted = await safeDeleteEmployeeById( _id )
        if(deleted === "Error Employee Not Found"){
            return "Error Employee Not Found"
        }else{
            return "Successfully Deleted"
        }

    } catch (e) {
        console.error(e)
        return "Error Employee Not Found"
    }
}

const serviceUpdateEmployeeById = async ( _id, _employee ) => {
    try {
        const updated = await updateEmployeeById ( _id, _employee )
        if(updated === "Error Employee Not Found"){
            return "Error Employee Not Found"
        }else{
            return updated
        }
    } catch (e) {
        console.error(e)
        return "Error Employee Not Updated"
    }
}

module.exports = {
    serviceCreateEmployee,
    serviceGetAllActiveEmployees,
    serviceGetEmployeeById,
    serviceSafeDeleteEmployee,
    serviceUpdateEmployeeById
}
