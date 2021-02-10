const QuizCategory=require('../schema/quizCategorySchema')
const Quiz=require("../schema/QuizSchema")
const PQuiz=require("../schema/PublicQuiz")


const addNewQuiz=(req,res,next)=>{

    let { categoryId,quizName,image}=req.body
    let newQuize=new Quiz({
        categoryId,
        quizName,
        image
    })

    newQuize.save()
        .then(result=>{
            res.json({
                message:"New Quiz Created",
                result
            })
        }).catch(error=>{
            res.json({
                message:"Server Error Found",
                error})
        })
}


const addNewQuestion=(req,res,next)=>{
    let id =req.params.id

    let { question, option1, option2, option3, option4, answerNr,mark}=req.body
   let data={
        question,option1,option2,option3,option4,answerNr,mark
    }
    Quiz.findOneAndUpdate({_id:`${id}`},{$push:{questions:data}})
              .then(result=>{
                    res.json({
                        message:"New Question Added Successful",
                        result
                    })
                }).catch(error=>{
                    res.json({
                        message:"Server Error Found",
                        error
              })
          })
}
const updateQuestion=(req,res,next)=>{
    let id =req.params.id
    let qid =req.params.qid
    let{question,option1,option2,option3,option4,answerNr,mark}=req.body
    Quiz.update({_id:id, 'questions._id': qid }, {
        '$set': {
            'questions.$.question': question,
            'questions.$.option1': option1,
            'questions.$.option1': option1,
            'questions.$.option2': option2,
            'questions.$.option3': option3,
            'questions.$.option4': option4,
            'questions.$.answerNr': answerNr,
            'questions.$.mark': mark
        }
    }).then(result=>{
                res.json({
                        message:"Update Successful",
                        result
                    })
    }).catch(error=>{
                    res.json({
                        message:"Server Error Found",
                        error
                    })
                })
}
const getQuizQuestion=(req,res,next)=>{
    let id=req.params.id
    Quiz.find({_id:`${id}`})
        .then(result=>{
            res.json({
               result:result[0].questions
            })
        }).catch(error=>{
            res.json({
                message:"Server Error Found",
                error
            })
        })
}
const deleteQuestion=(req,res,next)=>{
    let id = req.params.id
    let qid = req.params.qid
    Quiz.updateOne({ _id: id }, { $pull: { "questions": { _id: qid} } }, { safe: true, upsert: true })
        .then(result=>{
            res.json({
                message:"Question Deleted",
                result
            })
        }).catch(error=>{
            res.json({
                message: "Server Error Found",
                error
            }) 
        })
}

const getAllQuizes=(req,res,next)=>{
    let catId = req.params.catId
    let result=[]

    Quiz.find({categoryId:catId})
        .then(quizes => {
         quizes.forEach((data)=>{
              let quiz = {
                  _id:data._id,
                  quizName: data.quizName,
                  image: data.image,
                  totalQuestions: data.questions.length
              } 
              result.push(quiz)
          })
            res.json({
                result
            })
        }).catch(error => {
            res.json({
                message: "Server Error Found",
                error
            })
        })  


}

const updateQuiz=(req,res,next)=>{
    let id=req.params.id
     let {quizName} = req.body

    Quiz.findOneAndUpdate({ _id: `${id}` }, { $set: { quizName} }, { new: true })
        .then(result => {
            res.json({
                message: "Quiz Update Successful",
                result
            })
        })
        .catch(error => {
            res.json({
                message: "Server Error",
                error
            })
        })




}
const updateImage=(req,res,next)=>{
    let id=req.params.id
     let { image} = req.body
    Quiz.findOneAndUpdate({ _id: `${id}` }, { $set: { image} }, { new: true })
        .then(result => {
            res.json({
                message: "Image Upload Successful",
                result
            })
        })
        .catch(error => {
            res.json({
                message: "Server Error",
                error
            })
        })
}

const deleteQuiz=(req,res,next)=>{
    let id = req.params.id
    Quiz.findOneAndDelete({ _id: id })
        .then(result => {
            res.json({
                message: "Quiz Deleted Successfull"
            })
        })
        .catch(error => {
            res.json({
                message: "Server Error",
                error
            })
        })
}

const addNewQuizCategory= (req,res,next)=>{
    let category=req.body.category
    let newQuizCategory=new QuizCategory({
        categoryName:category
    })

    newQuizCategory.save()
        .then(result=>{
            res.json({
                message:"Category Saved Successfully",
                result
            })
        }).catch(error=>{
            res.json({
                message:"Server Error Found",
                error
            })
        })
}

const deleteQuizCategory=(req,res,next)=>{
    let id=req.params.id
    QuizCategory.findByIdAndDelete({_id:id})
        .then(result=>{
            res.json({
                message:"Category Deleted",
                result
            })
        })
        .catch(error=>{
            res.json({
                message:"Server Error Found",
                error
            })
        })
}
const updateQuizCategory=(req,res,next)=>{
    let id=req.params.id
    let category=req.body.category

    QuizCategory.update({_id:id},{'$set':{categoryName:category}})
    .then(result=>{
        res.json({
            message:"Category Updated",
            result
        })
    })
    .catch(error=>{
        res.json({
            message:"Server Error Found",
            error
        })
    })



}
const getAllQuizCategory=(req,res,next)=>{

    QuizCategory.find()
        .then(result=>{
            res.json({result})
        }).catch(error=>{
            res.json({
                message:"Server Error Found",
                error
            })
        })

}


const quizPublish=(req,res,next)=>{
    let{quizName,quizId,image,totalQuestion,time,endTime,className}=req.body
    let newQuiz=new PQuiz({quizName,quizId,image,totalQuestion,time,endTime,className})
    newQuiz.save()
        .then(result=>{
            res.json({
                message:"Quiz Published",
                result
            })
        })
        .catch(error=>{
            res.json({
                message:"Server Error Found",
                error
            })
        })
}


const submitAnswer=(req,res,next)=>{
    let id =req.params.id

    let {userName,userId,mark,timeSpent}=req.body
    let data={
        userName,userId,mark,timeSpent
    }
    PQuiz.findOneAndUpdate({_id:`${id}`},{$push:{answers:data}})
              .then(result=>{
                    res.json({
                        message:"Result Submit Success",
                        result
                    })
                }).catch(error=>{
                    res.json({
                        message:"Server Error Found",
                        error
              })
          })     
}

const getAllPublishedQuiz=(req,res,next)=>{
          
    PQuiz.find({},{quizId:1,quizName:1,image:1,totalQuestion:1,time:1,endTime:1,className:1})
        .then(result=>{
            console.log("here")
            res.json({result})
        }).catch(error=>{
            res.json({
                message:"Server Error Found",
                error
            })
        })
}

const getSpecificPublishQuizList=(req,res,next)=>{
    
    let{className}=req.params
    

    PQuiz.find({className},{quizId:1,quizName:1,image:1,totalQuestion:1,time:1,endTime:1,className:1})
        .then(result=>{
            console.log("here")
            res.json({result})
        }).catch(error=>{
            res.json({
                message:"Server Error Found",
                error
            })
        })
}




const getQuizAnswerList=(req,res,next)=>{
    let qId=req.params.qId

    PQuiz.find({_id:qId})
        .then(result=>{
            res.json({
                result:result[0].answers
             })
        }).catch(error=>{
            res.json({
                message:"Server Error Found",
                error
            })
        })



}







module.exports={
    addNewQuizCategory,
    deleteQuizCategory,
    updateQuizCategory,
    getAllQuizCategory,
    addNewQuiz,
    getAllQuizes,
    addNewQuestion,
    getQuizQuestion,
    updateQuiz,
    deleteQuiz,
    updateImage,
    updateQuestion,
    deleteQuestion,
    submitAnswer,
    quizPublish,
    getAllPublishedQuiz,
    getSpecificPublishQuizList,
    getQuizAnswerList
}