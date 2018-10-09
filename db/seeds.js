require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
mongoose.Promise = global.Promise
    
const { User, Restaurant } = require ('./model')

const gouda = new User({
    name: "Gouda",
    imageUrl: "https://i.imgur.com/DtuG0zk.jpg",
    neighborhood: "Grant Park",
    restaurants: [],
})

User.remove({})
  .then(() => gouda.save())
  .then(() => console.log('Successful Save'))
  .then(() => mongoose.connection.close())