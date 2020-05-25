const connection = require('../../config/connection')
const cloudinary = require('../../utils/cloudinary')

module.exports = {
    async registerPlant(_, {data, types}, ctx) {
        ctx.validateUser()
        const { user } = ctx
        data.user_id = user.id

        data.image = await cloudinary.upload(data.image)

        const response = await connection('plants').returning('id').insert(data)
        .then(async (res) => {
            await connection('plantTypes').returning('id').insert({
            tree: types[0],
            cactus: types[1],
            flower: types[2],
            leaf: types[3],
            plant_id: res[0]
        })
        })
        .then((res) => res)
        return 'Planta Registrada com sucesso'
    },
    async deletePlant(_, {filter}, ctx) {
        ctx.validateUser()
        const { user } = ctx
        response = await connection('plants').where({user_id: user.id, id: filter.id}).del()

        return response == 0 ? "Não foi possível excluir este item" : "Planta excluida com sucesso"
    },

    async updatePlant(_, {id, data, types}, ctx) {
        ctx.validateUser()
        const { user } = ctx

        const response = await connection('plants').returning('id').update(data).where('id', filter.id)
        .then(res => {
            await connection('plantTypes').returning('id').update({
                tree: types[0],
                cactus: types[1],
                flower: types[2],
                leaf: types[3],
                plant_id: res[0]   
            }).where('plant_id', id)
        })
        .then(res => res)

        return 'Planta salva com sucesso!'
    }
}