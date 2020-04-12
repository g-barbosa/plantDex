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
}