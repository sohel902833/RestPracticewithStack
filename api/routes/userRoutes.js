const express=require('express')
const router=express.Router()
const authenticate=require('../middleware/authenticate')

const userController=require('../controller/userController')



router.post('/login',userController.loginUser)
router.post('/register',userController.registerUser)
router.get('/',authenticate,userController.getAllUser)



module.exports=router


