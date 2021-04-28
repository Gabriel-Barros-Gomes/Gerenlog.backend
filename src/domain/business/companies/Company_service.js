const { 
    createCompany,
    findAllCompanyActive,
    findAllProviderCompanyActive,
    findCompanyById,
    findCompanyByName,
    safeDeleteCompanyById,
    updateCompanyById
 } = require('./Company_repository')


const serviceCreateCompany= async ( _company ) => {
    try{
        let verify = await findCompanyByName( _company.name )
        console.log(verify)

        if(!(verify === null || verify === undefined )){
            console.error('Company already exists')
            return "Company already exists"
        }else{
            return await createCompany( _company ) 
        }
    }catch(e){
        console.error(e)
        return "Company already exists"
    }
}

const serviceGetAllActiveCompany = async () => {
    try {
        const activeCompanies = await findAllCompanyActive()
        if(activeCompanies === null || activeCompanies === undefined){
            return "Error Companies not found"
        }else{
            return activeCompanies[0]
        }
    } catch (e) {
        console.error(e)
        return "Error Companies not found"
    }
}

const serviceGetAllActiveProviderCompany = async () => {
    try {
        const activeProviderCompanies = await findAllProviderCompanyActive()
        if(activeProviderCompanies === null || activeProviderCompanies === undefined){
            return "Error Companies not found"
        }else{
            return activeProviderCompanies[0]
        }
    } catch (e) {
        console.error(e)
        return "Error Companies not found"
    }
}

const serviceGetCompanyById = async ( _id ) => {
    try {
        const company = await findCompanyById( _id )
        if(company === null || company === undefined){
            console.log("Error Company Not Found")
            return "Error Company Not Found"
        }else{
            return company
        }
    } catch (e) {
        console.error(e)
        return "Error Company Not Found"
    }
}

const serviceSafeDeleteCompany = async ( _id ) => {
    try {
        const deleted = await safeDeleteCompanyById( _id )
        if(deleted === "Error Company Not Found"){
            return "Error Company Not Found"
        }else{
            return "Successfully Deleted"
        }

    } catch (e) {
        console.error(e)
        return "Error Company Not Found"
    }
}

const serviceUpdateCompanyById = async ( _id, _company ) => {
    try {
        const updated = await updateCompanyById ( _id, _company )
        if(updated === "Error Company Not Found"){
            return "Error Company Not Found"
        }else{
            return updated
        }
    } catch (e) {
        console.error(e)
        return "Error Company Not Updated"
    }
}

module.exports = {
    serviceCreateCompany,
    serviceGetAllActiveCompany,
    serviceGetAllActiveProviderCompany,
    serviceGetCompanyById,
    serviceSafeDeleteCompany,
    serviceUpdateCompanyById
}
