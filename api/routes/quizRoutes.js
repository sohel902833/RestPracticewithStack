const express=require('express')

const router=express.Router()
const quizContorller=require('../controller/quizController')

router.post('/cat',quizContorller.addNewQuizCategory)
router.delete('/cat/:id',quizContorller.deleteQuizCategory)
router.put('/cat/:id',quizContorller.updateQuizCategory)
router.get('/cat',quizContorller.getAllQuizCategory)

router.post('/',quizContorller.addNewQuiz)
router.get('/:catId',quizContorller.getAllQuizes)
router.put('/:id',quizContorller.updateQuiz)
router.delete('/:id',quizContorller.deleteQuiz)
router.put('/image/:id',quizContorller.updateImage)


router.post('/question/:id',quizContorller.addNewQuestion)
router.put('/:id/:qid',quizContorller.updateQuestion)
router.delete('/:id/:qid',quizContorller.deleteQuestion)
router.get('/question/:id',quizContorller.getQuizQuestion)


router.post('/publish',quizContorller.quizPublish)
router.get('/publish/quiz/',quizContorller.getAllPublishedQuiz)
router.get('/publish/quiz/:className',quizContorller.getSpecificPublishQuizList)
router.post('/answer/:id',quizContorller.submitAnswer)
router.get('/answer/:qId',quizContorller.getQuizAnswerList)





module.exports=router



