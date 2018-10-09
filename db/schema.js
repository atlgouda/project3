const Schema = require('mongoose').Schema

const UserSchema = new Schema({
    userName: String,
    imageUrl: String,
    neighborhood: String,
    restaurants: [],
})

const RestaurantSchema = new Schema({
    name: String,
    cuisine: String,
    linkAddress: String,
    imageUrl: String,
    neighborhood: String,
})

module.exports = {
    UserSchema,
    RestaurantSchema,
}