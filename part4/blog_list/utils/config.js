require('dotenv').config() // To be imported before any other module

let PORT =  process.env.PORT
let MONGODB_URI = process.env.MONGO_URI

if(process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT
}