const connection = require('../../config/connection')
const cloudinary = require('../../utils/cloudinary')

module.exports = {
    async registerPlant(_, {data, types}, ctx) {
        ctx.validateUser(data.user_id)
        const { user } = ctx
        data.user_id = user.id

        data.image = await cloudinary.upload(data.image)

        const trx = await connection.transaction();

        await trx('plants').returning('id').insert(data)
        .then(async (res) => {
            await trx('plantTypes').returning('id').insert({
            tree: types[0],
            cactus: types[1],
            flower: types[2],
            leaf: types[3],
            plant_id: res[0]
        })
        })
        .then((res) => res)

        await trx.commit()

        return 'Planta Registrada com sucesso'
    },

    async deletePlant(_, {id, user_id}, ctx) {
        ctx.validateUser(user_id)
        
        const { user } = ctx

        const trx = await connection.transaction();

        await trx('plantTypes').where({plant_id: id}).del()
        response = await trx('plants').where({user_id: user.id, id: id}).del()

        await trx.commit()

        return response == 0 ? "Não foi possível excluir este item" : "Planta excluida com sucesso"
    },

    async updatePlant(_, {id, data, types}, ctx) {
        ctx.validateUser(data.user_id)

        const trx = await connection.transaction();

        if (!data.image.includes('http')){
            data.image = await cloudinary.upload(data.image)
        }

        await trx('plants').returning('id').update(data).where('id', id)
        .then(async (res) => {
            await trx('plantTypes').returning('id').update({
                tree: types[0],
                cactus: types[1],
                flower: types[2],
                leaf: types[3],
                plant_id: res[0]   
            }).where('plant_id', id)
        })
        .then(res => res)

        await trx.commit()

        return 'Planta salva com sucesso!'
    }
}