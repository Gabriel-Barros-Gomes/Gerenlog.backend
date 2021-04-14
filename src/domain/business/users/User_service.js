const CryptoJS = require("crypto-js")
const {
    createUser, 
    findUserByCpf,
} = require('./User_repository')



const serviceCreateUser = async (_cpf, _user) => {
    try{
        
        let encriptedPassword = CryptoJS.AES.encrypt(_user.password, process.env.password_secret).toString()
        _user.password = encriptedPassword

        let verify = await findUserByCpf(_cpf)

        if(!(verify === null || verify === undefined)){
            console.error('User already exists')
            return {error: "User already exists"}
        }else{
            return await createUser( _user )
        }

    }catch(e){
        console.error(e)
    }
    
}

module.exports = {
    serviceCreateUser
}