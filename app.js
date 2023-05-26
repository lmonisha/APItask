const express=require('express')
const app=express()

var models=require('./db/models')
require('dotenv').config()

app.use(express.json())
app.use('/',require('./routes/index'))

app.listen('7000',()=>{
    models.sequelize.sync().then(()=>{
        console.log('Iam listening at 7000')
    })
})