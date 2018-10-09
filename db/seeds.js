require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
mongoose.Promise = global.Promise
    