const express = require('express')
const { connection } = require('./config/database')
const { router } = require('./routes/user.route')
const app = express()
const cookie= require("cookie-parser")

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookie())

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.use(express.static(__dirname+'/public'))



app.use('/user',router)

app.listen(9705,()=>{
    console.log('9705');
    connection()
})