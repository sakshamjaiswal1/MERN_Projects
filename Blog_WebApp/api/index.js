const express = require('express')
const app = express()

app.use('/',(req,res)=>{
    console.log('this is main Url')
})


app.listen('5000',()=>{
    console.log('Backend is Running')
})