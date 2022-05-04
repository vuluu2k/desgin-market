const Account = require('../models/Account');
const argon2= require('argon2');
const jwt = require('jsonwebtoken');

class AccountController{
    async createAccount(req, res){
        const {nameAccount,passwordAccount}=req.body;
        if(!nameAccount||!passwordAccount)
            return res.status(400)
                        .json({success:false,message:'Bạn chưa nhập tài khoản/ mật khẩu'})
        try {
            const account=await Account.findOne({nameAccount})
            if(account)
                return res.status(400)
                            .json({success:false,message:'Tên người dùng đã tồn tại'})
            const hashedPasswordAccount = await argon2.hash(passwordAccount);
            const newAccount= new Account({
                nameAccount,
                passwordAccount:hashedPasswordAccount
            })
            await newAccount.save();
            const accessToken=jwt.sign({AccountId:newAccount._id},process.env.ACCESS_TOKEN_SECRET)
            return res.json({success:true,message:'Tạo tài khoản thành công',accessToken})
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({success:false,message:'Lỗi máy chủ nội bộ'});
        }
    }   
    async loginAccount(req, res){
        const {nameAccount,passwordAccount}=req.body;
        if(!nameAccount||!passwordAccount)
            return res.status(400)
                        .json({success:false,message:'Bạn chưa nhập tài khoản/ mật khẩu'})
        try {
            const account=await Account.findOne({nameAccount})
            if(!account)
                return res.status(400)
                            .json({success:false,message:'Tài khoản hoặc mật khẩu không chính xác'})
            const passwordAccountValid=await argon2.verify(account.passwordAccount,passwordAccount);
            if(!passwordAccountValid)
                return res.status(400)
                            .json({success:false,message:'Tài khoản hoặc mật khẩu không chính xác'})
            const accessToken=jwt.sign({accountId:account._id},process.env.ACCESS_TOKEN_SECRET);
            res.json({success:true,message:'Đăng nhập thành công',accessToken})
            
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({success:false,message:'Lỗi máy chủ nội bộ'});
        }
    }
    async checkAccount(req, res){
        try {
            const account=await Account.findById(req.accountId).select('-password');
            if(!account)
                return res.status(400)
                            .json({success:false,message:'Không tìm thấy tài khoản'})
            res.json({success:true,account})
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({success:false,message:'Lỗi máy chủ nội bộ'});
        }
    }
}

module.exports = new AccountController();