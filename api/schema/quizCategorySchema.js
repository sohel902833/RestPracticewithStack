const mongoose=require('mongoose')
const Schema=mongoose.Schema

const quizCategory=new Schema({
    categoryName:String
})


const QuizCategory =mongoose.model("category",quizCategory)

module.exports=QuizCategory




