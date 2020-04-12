const connection = require('../../config/connection')
const cloudinary = require('../../utils/cloudinary')

module.exports = {

    async plants (_,data, ctx) {
        ctx.validateUser()
        const { user } = ctx
        const plants = await connection('plants').where({user_id: user.id})

        plants.forEach(async (plant) => {
            if (plant.image !== null || plant.image !== "")
                plant.image = await cloudinary.get(plant.image)
        })
        return plants
    }
}