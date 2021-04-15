const CryptoJS = require("crypto-js")

const {
    createUser, 
    findUserByCpf,
    findAllUserActive,
    safeDeleteUserByCpf,
    updateUserByCpf
} = require('./User_repository')



const serviceCreateUser = async (_cpf, _user) => {
    try{
        
        let encriptedPassword = CryptoJS.AES.encrypt(_user.password, process.env.password_secret).toString()
        _user.password = encriptedPassword

        let verify = await findUserByCpf(_cpf)

        if(!(verify === null || verify === undefined)){
            console.error('User already exists')
            return "User already exists"
        }else{
            if( _user.cpf === "" || _user.cpf === null || _user.cpf === undefined ){
                return "User already exists"
            }else{
                return await createUser( _user )
            }
            
        }

    }catch(e){
        console.error(e)
        return "User already exists"
    }
    
}

const serviceGetAllActiveUsers = async () => {
    try {
        const activeUsers = await findAllUserActive()
        if (activeUsers === null || activeUsers === undefined) {
            return "Error Users Not Found"
        } else {
            return activeUsers[0]
        }

    } catch (e) {
        console.error(e)
        return "Error Users Not Found"
    }
}

const serviceGetUserByCpf = async ( _cpf ) => {
    try{
        const user = await findUserByCpf( _cpf)
        if (user === null || user === undefined) {
            return "Error User Not Found"
        } else {
            return user
        }
    }catch(e){
        console.error(e)
        return "Error User Not Found"
    }
}

const serviceSafeDeleteUser = async ( _cpf ) => {
    try{
        const deleted = await safeDeleteUserByCpf( _cpf )
        if(deleted === "Error User Not Found"){
            return "Error User Not Found"
        }else{
            return "Successfully Deleted"
        }
    }catch(e){
        console.error(e)
        return "Error User Not Deleted"
    }
}

const serviceUpdateUserByCpf = async ( _cpf, _user ) => {
    try{
        const updated = await updateUserByCpf( _cpf , _user)
        if(updated === "Error User Not Found"){
            return "Error User Not Found"
        }else{
            return updated
        }
    }catch(e){
        console.error(e)
        return "Error User Not Updated"
    }
}

module.exports = {
    serviceCreateUser,
    serviceGetAllActiveUsers,
    serviceGetUserByCpf,
    serviceSafeDeleteUser,
    serviceUpdateUserByCpf
}