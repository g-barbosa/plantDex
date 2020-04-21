const connection = require('../../config/connection')
const bcrypt = require('bcrypt-nodejs')

module.exports = {
    async registerUser(_, {data}) {
        const salt = bcrypt.genSaltSync()

        data.password = bcrypt.hashSync(data.password, salt)

        const response = await connection('users').insert(data)

        return {
            id: response[0],
            login: data.login,
            password: data.password
        } 
    },

    async deleteUser(_, {data}, ctx) {
        ctx.validateUser()
        const {user} = ctx

        await connection('plants').where({user_id: user.id}).del()
        response = await connection('users').where({id: user.id}).del()

        return response == 0 ? "Não foi possível excluir usuário" : "Usuário excluido com sucesso"
    }
}