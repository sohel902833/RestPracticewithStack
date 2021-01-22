

const User=require('../schema/userSchema')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const loginUser=(req,res,next)=>{
        let{email,password}=req.body

        User.findOne({email})
            .then(user=>{

                if(user){
                    bcrypt.compare(password,user.password, (err,result)=>{
                            if(err){
                                res.json({
                                    message:"Error Occured"
                                })
                            }

                            if(result){
                                let token=jwt.sign({email:user.email,_id:user._id},"SECRET",{expiresIn:'2h'})
                                res.json({
                                    message:"Login Successful",
                                    token:`Bearer ${token}`
                                })
                            }else{
                                res.json({
                                    message:"Login Failed, Password Doesn\'t Match"
                                })
                            }
                    })
                }else{
                    res.json({
                        message:"User Not Found"
                    })
                }

            }).catch(err=>{
                res.json({
                    message:"Server Error",
                    err
                })
            })











}

const registerUser=(req,res,next)=>{

    let{email,password}=req.body
    bcrypt.hash(password,10,(err,hash)=>{
            if(err){
                res.json({
                    message:"Password Hashing Failed",
                    err
                })
            }

            let newUser=new User({
                email,
                password:hash
            })
         newUser.save()
            .then(result=>{
                res.json({
                    message:"user created Successfully ",
                    result
                })
            }).catch(err=>{

                if(err.keyValue.email){ 
                    res.json({
                        message:"This User is Already Exists"
                    })
                }else{
                    res.json({
                        message:"user Created Failed",
                        err
                    })
                }


            })
    })




}


const getAllUser=(req,res,next)=>{

    User.find()
        .then(result=>{
                res.json({result})
        })
        .catch(err=>{
            message:"Server Error Found",
            err
        })


}

module.exports={
    loginUser,
    registerUser,
    getAllUser
}