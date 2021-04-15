const { User } = require('./User_model')
const { sequelize , QueryTypes } = require('../../../infrastructure/config/database_config')

async function createUser( _user ){
    try{
        return await User.create( _user )
    }catch(e){
        console.error('User Failed to Create\n', e)
    }
}

async function findAllUserActive(){
    try{
        return await sequelize.query('SELECT * FROM public."users" WHERE active = true ORDER BY cpf ASC ', QueryTypes.SELECT)
    }catch(e){
        console.error('Users not Founds\n', e)
    }
}

async function findUserByCpf( _cpf ){
    try{
        return await User.findByPk( _cpf )
    }catch(e){
        console.error('Users not Founds\n', e)
    }
}

async function safeDeleteUserByCpf( _cpf ){
    try{
        const userToDelete = await User.findByPk( _cpf )
        if(userToDelete === null || userToDelete === undefined){
            return "Error User Not Found"
        }else{
            userToDelete.dataValues.active = false
            return await User.update( userToDelete.dataValues , {where:{
                cpf:_cpf
            }})
        }
    }catch(e){
        console.error('Failed to Delete', e)
    }
}

async function updateUserByCpf( _cpf, _user ){
    try{
        const userToUpdate = await User.findByPk( _cpf)
        if(userToUpdate === null || userToUpdate === undefined){
            return "Error User Not Found"
        }else{
            return await userToUpdate.update( _user , {where:{
                cpf:_cpf
            }})
        }
    }catch(e){
        console.error('Failed to Update', e)
    }
}

module.exports = {
    createUser,
    findAllUserActive,
    findUserByCpf,
    updateUserByCpf,
    safeDeleteUserByCpf
}