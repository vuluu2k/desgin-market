const express = require('express');
const router=express.Router();
const AccountController= require('../controllers/AccountController');
const verifytoken = require('../middlewares/account');

// [Admin]
router.get('/',verifytoken,AccountController.checkAccount);

// [Admin]Tạo tài khoản 
router.post('/create',AccountController.createAccount);

// [Admin]Đăng nhập tài khoản

router.post('/login',AccountController.loginAccount);

module.exports=router;