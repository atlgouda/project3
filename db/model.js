const mongoose = require('mongoose')
const { UserSchema, RestaurantSchema } = require('./schema')

const UserModel = mongoose.model('User', UserSchema)
const RestaurantModel = mongoose.model('Restaurant', RestaurantSchema)
module.exports = {
    User: UserModel,
    Restaurant: RestaurantModel,
}