const jwt=require('jsonwebtoken');
const verifytoken=(req,res,next)=>{
    const accountHeader=req.header('Authorization');
    const token = accountHeader && accountHeader.split(' ')[1];
    if(!token)
        return res.status(401).json({success: false,message: 'Access token không được tìm thấy'});
    try {
        const decode=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        req.accountId=decode.accountId;
        next();
    }catch(error){
        console.log(error);
        return res.status(403).json({success:false,message:'Token không hợp lệ'});
    }
}

module.exports=verifytoken;