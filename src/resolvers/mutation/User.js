const connection = require('../../config/connection')
const bcrypt = require('bcrypt-nodejs')

module.exports = {
    async registerUser(_, {data}) {
        const salt = bcrypt.genSaltSync()

        data.password = bcrypt.hashSync(data.password, salt)

        const verifyUser = await connection('users').where({login: data.login})

        if (verifyUser.length != 0){
            throw new Error('Já existe um usuário com este login')
        }

        const response = await connection('users').insert(data)

        return {
            id: response[0],
            login: data.login,
        } 
    },

    async deleteUser(_, {id, password}, ctx) {
        ctx.validateUser(id)
        const {user} = ctx

        const pass = bcrypt.compareSync(password, user.password)

        if (!pass)
        throw new Error("Esta senha não é válida")        

        await connection('plants').where({user_id: user.id}).del()
        response = await connection('users').where({id: user.id}).del()

        return response == 0 ? "Não foi possível excluir usuário" : "Usuário excluido com sucesso"
    },

    async changePassword(_, {id, password, newPassword}, ctx) {
        ctx.validateUser(id)

        const user = await connection('users').where({id: id}).first()

        if (!user)
        throw new Error("Não foi possível encontrar este usuário")

        const pass = bcrypt.compareSync(password, user.password)

        if (!pass)
        throw new Error("Esta senha não é válida")

        const salt = bcrypt.genSaltSync()
        newPassword = bcrypt.hashSync(newPassword, salt)

        const response = await connection('users').returning('id').update({password: newPassword}).where('id', id)

        return response == 0 ? "Não foi possível alterar sua senha" : "Senha alterada com sucesso"
    }
}