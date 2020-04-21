const jwt = require('jwt-simple')
require('dotenv').config()

module.exports = async ({req}) => {
    const auth = req.headers.authorization
    const token = auth && auth.substring(7)
    let user = null

    if(token) {
        try {
            let content = jwt.decode(auth, process.env.APP_AUTH_SECRET)
            user = content
        }catch(e){
            throw new Error("Tivemos um erro interno")
        }
    }
    const err = new Error('acesso negado')
    return {
        user,
        validateUser(){
            if(!user) throw err
        },
        validatePlantFilter(filter){

            if(!user) throw err
            if(!filter) throw err

            const {id, name, userId} = filter

            if(!id && !name) throw err
            if(id && userId !== user.id) throw err
            if(name && userId != user.email) throw err
        }
    }
}