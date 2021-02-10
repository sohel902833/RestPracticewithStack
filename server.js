const express=require('express')
const morgan=require('morgan')
const bodyParser=require('body-parser')
const cors=require('cors')
const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/Quiz')

const db=mongoose.connection
db.on('error',(err=>{
    console.log(err)
}))
db.once('open',()=>{
    console.log("Database Connected")
})


const userRoute=require('./api/routes/userRoutes')

const app=express()
app.use(cors()) 
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const PORT=process.env.PORT || 4000

app.use('/api/users',userRoute)
app.use('/api/quiz',require('./api/routes/quizRoutes'))



app.get('/',(req,res)=>{
    res.json("Md Sohrab Hossain")
})

app.listen(PORT,()=>{
    console.log(`Server is Running on PORT ${PORT}`)
})
