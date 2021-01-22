const mongoose = require('mongoose')
const Schema=mongoose.Schema
const validator=require('validator')
 

const contactSchema=new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        minlength:3
    },
   phone:{
        type:String,
        trim:true,
        required:true,
        unique:true
   },
   email:{
       type:String,
       trim:true,
        validate:{
            validator:(v)=>{
              return validator.isEmail(v)      
            },
            message:`{VALUE} is not email`
        }
   }
})



const Contact=mongoose.model('contacts',contactSchema)

module.exports=Contact