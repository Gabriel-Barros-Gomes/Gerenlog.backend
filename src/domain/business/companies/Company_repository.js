const { Company } = require('./Company_model')
const { sequelize , QueryTypes } = require('../../../infrastructure/config/database_config')

async function createCompany( _company ){
    try{
        return await Company.create( _company )
    }catch(e){
        console.error('Company Failed to Create\n', e)
    }
}

async function findAllCompanyActive(){
    try{
        return await sequelize.query('SELECT * FROM public."companies" WHERE active = true ORDER BY id ASC ', QueryTypes.SELECT)
    }catch(e){
        console.error('Companies not Founds\n', e)
    }
}

async function findAllProviderCompanyActive(){
    try{
        return await sequelize.query('SELECT * FROM public."companies" WHERE active = true AND provider = true ORDER BY id ASC ', QueryTypes.SELECT)
    }catch(e){
        console.error('Companies not Founds\n', e)
    }
}

async function findCompanyById( _id ){
    try{
        return await Company.findByPk( _id )
    }catch(e){
        console.error('Companies not Founds\n', e)
    }
}

async function findCompanyByName( _name ){
    try {
        return await Company.findOne( {where:{
            name: _name
        }} )
    } catch (e) {
        console.error('Company not Found', e)
    }
}

async function safeDeleteCompanyById( _id ){
    try{
        const companyToDelete = await Company.findByPk( _id )
        if(companyToDelete  === null || companyToDelete === undefined){
            return "Error Company Not Found"
        }else{
            companyToDelete.dataValues.active = false
            return await Company.update( companyToDelete.dataValues , {where:{
                id:_id
            }})
        }
    }catch(e){
        console.error('Failed to Delete', e)
        return "Error Company Not Found"
    }
}

async function updateCompanyById( _id, _company ){
    try{
        const companyToUpdate = await Company.findByPk( _id )
        if(companyToUpdate  === null || companyToUpdate === undefined){
            return "Error Company Not Found"
        }else{
            return await companyToUpdate.update( _company, {where:{
                id: _id
            }} )
        }
    }catch(e){
        console.error('Failed to Update', e)
        return "Error Company Not Found"
    }
}
module.exports = {
    createCompany,
    findAllCompanyActive,
    findAllProviderCompanyActive,
    findCompanyByName,
    findCompanyById,
    safeDeleteCompanyById,
    updateCompanyById
}
