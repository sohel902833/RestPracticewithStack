
const Contact=require('../schema/contactSchema')

const saveNewContact=(req,res,next)=>{
    let {name,email,phone}=req.body

    const newContact=new Contact({
        name,
        email,
        phone
    })

    newContact.save()
        .then(result=>{
            res.json({
                message:"Data Saved",
                result
            })
        }).catch(err=>{

            if(err.keyValue.phone){
                res.json({
                    message:"This Phone Number is Already Exists",
                    phone:`${err.keyValue.phone}`
                }) 
            }else{

                res.json({
                    message:"Server Error",
                    err
                })
            }

        })
}


const getContact=(req,res,next)=>{

        Contact.find()
            .then(result=>{
                res.json({message:"All Contact",result})
            }).catch(err=>{
                res.json({
                    message:"Server Error Found",
                    err
                })
            })

}


const getSingleContact=(req,res,next)=>{

        let id=req.params.id

        Contact.findById(id)
            .then(result=>{
                res.json({result})
            }).catch(err=>{
                res.json({
                    message:"Server Error Found",
                    err
                })
            })
}


const deleteContact=(req,res,next)=>{
    let id=req.params.id

    Contact.findByIdAndDelete(id)
        .then(result=>{
            res.json({
                message:"Successfully Deleted",
                result
            
            })
        }).catch(err=>{
            res.json({
                message:"Server Error Found",
                err
            })
        })



}

const editContact=(req,res,next)=>{
        let id=req.params.id

        let updatedContact={
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email
        }


        Contact.findByIdAndUpdate(id,{$set:updatedContact})
            .then(result=>{
                res.json({
                    message:"Data Updated Successfully",
                    result
                })
            }).catch(err=>{
            res.json({
                message:"Server Error Found",
                err
            })
        })






}


module.exports={
    saveNewContact,
    getContact,
    getSingleContact,
    deleteContact,
    editContact
}