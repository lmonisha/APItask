const express=require('express')

const router=express.Router();
const Empcontroller=require('../Controller/employeeController');
const auth=require('../middleware/authenticate').verifyToken

router.post('/register',Empcontroller.register)
router.post('/login',auth,Empcontroller.login)
module.exports=router;