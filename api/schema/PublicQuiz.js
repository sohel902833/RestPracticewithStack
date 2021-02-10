const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PublicQuiz = new Schema({
    quizId:String,
    quizName:String,
    totalQuestion:String,
    image:String,
    time:String,
    endTime:String,
    className:String,
    answers: [{
        userName:String,
        userId:{
            type:String,
            unique:"true"
        },
        mark:String,
        timeSpent:String
    }]
})
const PQuiz = mongoose.model('publicQuiz', PublicQuiz )
module.exports = PQuiz