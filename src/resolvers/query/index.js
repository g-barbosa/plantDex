const user = require('./User')
const plant = require('./Plant')

 module.exports = {
    ...user,
    ...plant,
 }