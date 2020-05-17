const connection = require('../../config/connection')
const cloudinary = require('../../utils/cloudinary')

module.exports = {

    async plants (_, data, ctx) {
        ctx.validateUser()
        const { user } = ctx
        const plants = await connection('plants').where({user_id: user.id})

        plants.forEach(async (plant) => {
            if (plant.image !== null || plant.image !== "")
                plant.image = await cloudinary.get(plant.image)
        })
        return plants
    },

    async plant (_, {filter}, ctx) {
        ctx.validateUser()
        const { user } = ctx
        const plant = await connection('plants').where({user_id: user.id, id: filter.id}).first();
        
        if (plant == null)
            throw new Error('Não foi possível encontrar esta planta')

        const types = await connection('plantTypes').where({plant_id: plant.id}).first();

        return {
            id: plant.id,
            name: plant.name,
            scientificName: plant.scientificName,
            informations: plant.informations,
            image: plant.image,
            types: [types.tree, types.cactus, types.flower, types.leaf],
            user_id: plant.user_id
        }
    }
}