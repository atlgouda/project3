const Schema = require('mongoose').Schema

const RestaurantSchema = new Schema({
    restName: String,
    cuisine: String,
    linkAddress: String,
    restImageUrl: String,
    restNeighborhood: String,
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