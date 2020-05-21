const cloudinary = require('cloudinary').v2
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.APP_CLOUD_NAME,
    api_key: process.env.APP_API_KEY,
    api_secret: process.env.API_SECRET
  });

  module.exports = {
      upload(image) {
        const imageUploaded = cloudinary.uploader.upload(image)
            .then( result => {
                return `${result.public_id}.${result.format}`
            })
            .catch( error => {console.log(error);throw new Error(error)})

        return imageUploaded 
      },

      get(img) {
          const image = cloudinary.url(img)
          return image
      }
  }