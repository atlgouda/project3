const router = require('express').Router({ mergeParams: true })
const { User, Restaurant } = require('../db/model')

//show all
router.get('/', async (req, res) => {
    const user = await User.findById(req.params.userId)
    const restaurants = user.restaurants
    res.send(restaurants)
})

//Show One
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.userId)
    const restaurant = user.restaurants.id(req.params.id)
    res.send(restaurant)
})


//route to add restaurant
router.post('/', (req, res) => {
    const newRestaurant = new Restaurant(req.body)

    User.findById(req.params.userId)
        .then((user) => {
            user.restaurants.push(newRestaurant)
            return user.save()
        })
        .then((user) => {
            res.send(user)
        })
})
//Update Route
router.put('/:id', (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
         user.restaurants.id(req.params.id).set
         (req.body)
        return user.save()
        
    })
    .then(restaurant => {
        res.send(restaurant)
    })
})

module.exports = router