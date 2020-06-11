require('dotenv').config() // To be imported before any other module

let PORT =  process.env.PORT
let MONGODB_URI = process.env.MONGO_URI

module.exports = {
  MONGODB_URI,
  PORT
}