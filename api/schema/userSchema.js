const mongoose=require('mongoose')
const validator=require('validator')


const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
         validate:{
             validator:(v)=>{
               return validator.isEmail(v)      
             },
             message:`{VALUE} is not email`
         }
    },
    password:{
        type:String,
        required:true
    }

})




const User=mongoose.model('users',userSchema)
module.exports=User


