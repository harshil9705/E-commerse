const { default: mongoose } = require("mongoose");
require('dotenv').config()
const connection = ()=>{
    url = process.env.db_url
    mongoose.connect(url)
    console.log('db connected');
}

module.exports = {connection}