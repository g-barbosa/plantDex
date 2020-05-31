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
        validateUser(id){
            if(!user) throw err
            if(user.id !== id) throw err
        },
    }
}