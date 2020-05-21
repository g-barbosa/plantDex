const connection = require('../../config/connection')
const cloudinary = require('../../utils/cloudinary')

module.exports = {

    async plants (_, data, ctx) {
        ctx.validateUser()
        const { user } = ctx
        const plants = await connection('plants').where({user_id: user.id})
        var plantsResponse = []

        for (i = 0; i < plants.length; i++) {
            if (plants[i].image !== null || plants[i].image !== "")
                plants[i].image = await cloudinary.get(plants[i].image)
            
            const types =  await connection('plantTypes').where({plant_id: plants[i].id})
            plants[i].types = types.length === 0 ? [false,false,false,false] : [types[0].tree, types[0].cactus, types[0].flower, types[0].leaf]
        }
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