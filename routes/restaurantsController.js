const router = require('express').Router()
const { User, Restaurant } = require('../db/model')

//route to add restaurant
router.post('/', (req, res) => {
    const newRestaurant = new Restaurant()

    User.findById(req.params.userId)
        .then((user) => {
            user.restaurants.push(newRestaurant)
            return user.save()
        })
        .then((user) => {
            res.send(user)
        })
})

module.exports = router