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
        return await sequelize.query('SELECT * FROM public."Users" WHERE active = true ORDER BY id ASC ', QueryTypes.SELECT)
    }catch(e){
        console.error('Users not Founds\n', e)
    }
}

async function findUserById( _userid ){
    try{
        return await User.findByPk( _userid )
    }catch(e){
        console.error('Users not Founds\n', e)
    }
}

async function safeDeleteUserById( _userid ){
    try{
        const userToDelete = await User.findByPk( _userid )
        userToDelete.dataValues.active = false
        userToDelete.dataValues.email = "null@email.com"
        userToDelete.dataValues.cpf = "00000000000"
        return await User.update( userToDelete.dataValues , {where:{
            id:_userid
        }})
    }catch(e){
        console.error('Failed to Delete', e)
    }
}

async function updateUserById( _userid ){
    try{
        const userToUpdate = await User.findByPk( _userid )
        return await User.update( userToUpdate.dataValues , {where:{
            id:_userid
        }})
    }catch(e){
        console.error('Failed to Update', e)
    }
}

module.exports = {
    createUser,
    findAllUserActive,
    findUserById,
    updateUserById,
    safeDeleteUserById
}