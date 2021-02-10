

const User=require('../schema/userSchema')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const loginUser=(req,res,next)=>{
        let{email,password}=req.body

        User.findOne({email})
            .then(user=>{
                if(user){
                    if(password==user.password){
                        res.json({
                            _id:user._id,
                            message:"Login Successful",
                            name:user.name,
                            status:"done",
                            className:user.className,
                            email:user.email
                        })
                    }else{
                        res.json({
                            message:"Login Failed, Password Doesn\'t Match",
                            status:"failed"
                   
                        })
                    }
                }else{
                    res.json({
                        message:"User Not Found",
                        status:"failed"
                   
                    })
                }

            }).catch(err=>{
                res.json({
                    message:"Server Error",
                    status:"failed",
                    err
                })
            })
}

const registerUser=(req,res,next)=>{

    let{name,email,password,className}=req.body

    let newUser=new User({name,email,password,className})
         newUser.save()
            .then(result=>{
                res.json({
                    _id:result._id,
                    message:"user created Successfully ",
                    status:"done",
                    name:result.name,
                    className:result.className,
                    email:result.email
                })
            }).catch(err=>{

                if(err.keyValue.email){ 
                    res.json({
                        status:"failed",
                        message:"This User is Already Exists"
                    })
                }else{
                    res.json({
                        status:"failed",
                        message:"user Created Failed",
                        err
                    })
                }
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