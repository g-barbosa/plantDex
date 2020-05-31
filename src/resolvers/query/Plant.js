const connection = require('../../config/connection')
const cloudinary = require('../../utils/cloudinary')

module.exports = {

    async plants (_, {id}, ctx) {
        ctx.validateUser(id)
        const { user } = ctx
        const plants = await connection('plants').where({user_id: user.id})
        for (i = 0; i < plants.length; i++) {
            if (plants[i].image !== null || plants[i].image !== "")
                plants[i].image = await cloudinary.get(plants[i].image)

            const types =  await connection('plantTypes').where({plant_id: plants[i].id})

            if (types.length !== 0) {
                newTypes = []
                types[0].tree ? newTypes.push('Árvore') : newTypes = newTypes
                types[0].cactus ? newTypes.push('Cacto') : newTypes = newTypes
                types[0].flower ? newTypes.push('Flor') : newTypes = newTypes
                types[0].leaf ? newTypes.push('Folha') : newTypes = newTypes

                plants[i].types = newTypes

            } else {
                plants[i].types = types
            }
        }

        return plants
    },
}