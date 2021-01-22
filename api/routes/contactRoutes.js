const express=require('express')
const router=express.Router();
const contactController=require('../controller/contactController')


router.get('/',contactController.getContact)
router.post('/',contactController.saveNewContact)
router.get('/:id',contactController.getSingleContact)
router.put('/:id',contactController.editContact)
router.delete('/:id',contactController.deleteContact)
module.exports=router


