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

const bartaco = new Restaurant ({
    name: "bartaco",
    cuisine: "Mexican",
    linkAddress: "https://bartaco.com/location/atlanta-inman/",
    imageUrl: "https://i.imgur.com/fSgZUKO.jpg",
    neighborhood: "Inman Park"
})

const dishDive = new Restaurant ({
    name: "Dish Dive",
    cuisine: "American",
    linkAddress: "http://www.dishdivekitchen.com/",
    imageUrl: "https://i.imgur.com/WRf2clI.jpg",
    neighborhood: "Decatur"
})

const firePit = new Restaurant ({
    name: 'Firepit Tavern',
    cuisine: "Pizza",
    linkAddress: "http://www.firepitatl.com/",
    imageUrl: "https://i.imgur.com/Dsi0snU.jpg",
    neighborhood: "Grant Park"
})

const no246 = new Restaurant ({
    name: "Number 246",
    cuisine: "Italian",
    linkAddress: "http://www.no246.com/",
    imageUrl: "https://i.imgur.com/VbBnJtU.jpg",
    neighborhood: "Decatur"
})

const gouda = new User({
    name: "Gouda",
    imageUrl: "https://i.imgur.com/DtuG0zk.jpg",
    neighborhood: "Grant Park",
    restaurants: [firePit, bartaco, dishDive],
})

const daniel = new User({
    name: "Ronnie",
    imageUrl: "https://i.imgur.com/7tR2kji.jpg?1",
    neighborhood: "Midtown",
    restaurants: [goldenEagle, no246],
})


User.deleteMany({})
  .then(() => {
      return User.insertMany([gouda, daniel])
  })
  .then(() => console.log('Successful Save'))
  .then(() => mongoose.connection.close())