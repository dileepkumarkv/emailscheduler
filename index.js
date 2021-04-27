const express=require('express')
const mongoose=require('mongoose')
const app=express()
const url="mongodb://localhost/email"
mongoose.connect(url,{useNewUrlParser:true})
const con=mongoose.connection
con.on('open',function(){
    console.log('connected')
})

app.use(express.json())
const emailrouter=require('./router/email.router')
app.use('/email',emailrouter)

app.listen('3000',function(){
    console.log('server started')
})