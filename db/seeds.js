require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
mongoose.Promise = global.Promise
    
const { User, Restaurant } = require ('./model')

const goldenEagle = new Restaurant({
    name: "Golden Eagle",
    cuisine: "American",
    linkAddress: "http://www.goldeneagleatl.com/",
    imageUrl: "https://i.imgur.com/pNVpw4n.jpg",
    neighborhood: "Reynoldstown"
})

const gouda = new User({
    name: "Gouda",
    imageUrl: "https://i.imgur.com/DtuG0zk.jpg",
    neighborhood: "Grant Park",
    restaurants: [],
})

const daniel = new User({
    name: "Daniel",
    imageUrl: "TBD",
    neighborhood: "Midtown",
    restaurants: [goldenEagle],
})


User.deleteMany({})
  .then(() => {
      return User.insertMany([gouda, daniel])
  })
  .then(() => console.log('Successful Save'))
  .then(() => mongoose.connection.close())