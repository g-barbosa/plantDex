const connection = require('../../config/connection')
const cloudinary = require('../../utils/cloudinary')

module.exports = {
    async registerPlant(_, {data}, ctx) {
        ctx.validateUser()
        const { user } = ctx
        data.user_id = user.id

        data.image = await cloudinary.upload(data.image)

        const response = await connection('plants').insert(data)

        return {
            id: response[0],
            name: data.name,
            scientificName: data.scientificName,
            informations: data.informations,
            image: data.image,
            user_id: data.user_id
        }
    },
    async deletePlant(_, {filter}, ctx) {
        ctx.validateUser()
        const { user } = ctx
        response = await connection('plants').where({user_id: user.id, id: filter.id}).del()

        return response == 0 ? "Não foi possível excluir este item" : "Planta excluida com sucesso"
    }
}