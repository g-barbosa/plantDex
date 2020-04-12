const connection = require('../../config/connection')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jwt-simple')
module.exports = {
    async login(_, {data}) {
        const user = await connection('users').where({login: data.login}).first()
        if (!user)
            throw new Error("Usuário ou senha inválidos")
        
        const pass = bcrypt.compareSync(data.password, user.password)

        if (!pass)
            throw new Error("Usuário ou senha inválidos")

        const now = Math.floor(Date.now() / 1000)

        const userInfo = {
            id: user.id,
            login: user.login,
            iat: now + (3 * 24 * 60 * 60)
        }

        const authSecret = process.env.APP_AUTH_SECRET
        return {
            ...userInfo,
            token: jwt.encode(userInfo, authSecret)
        }
    },
}