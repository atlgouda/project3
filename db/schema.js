const Schema = require('mongoose').Schema

const RestaurantSchema = new Schema({
    name: String,
    cuisine: String,
    linkAddress: String,
    imageUrl: String,
    neighborhood: String,
})
const UserSchema = new Schema({
    name: String,
    imageUrl: String,
    neighborhood: String,
    restaurants: [RestaurantSchema],
})



module.exports = {
    UserSchema,
    RestaurantSchema,
}