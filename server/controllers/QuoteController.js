const Quote = require('../models/Quote');
const Product=require('../models/Product');

class QuoteController {
    async createQuote(req,res){
        const {nameQuote,phoneQuote,product}=req.body;
        if(!nameQuote||!phoneQuote)
            return res.status(400)
                        .json({success:false,message:'Tên người báo giá và số điện thoại là bắt buộc'});
        try {
            const newQuote=new Quote({
                nameQuote,
                phoneQuote,
                product
            })
            await newQuote.save();
            res.json({success:true,message:'Bạn đăng kí nhận báo giá thành công',quote:newQuote});
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({success:false,message:'Lỗi máy chủ nội bộ'})
        }
    }
    async getQuote(req, res) {
        try {
            const quotes=await Quote.find({}).populate({path:'product'});
            res.json({success:true,quotes})
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({success:false,message:'Lỗi máy chủ nội bộ'})
        }
    }
    async deleteQuote(req,res){
        try {
            const quoteDeleteCondition={_id:req.params.id};
            const deleteQuote=await Quote.findOneAndDelete(quoteDeleteCondition);
            if(!deleteQuote)
                return res.status(401)
                            .json({success:false,message:'Khách hàng nhận báo giá này không được tìm thấy'});
            res.json({success:true,message:'xoá thành công'})
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({success:false,message:'Lỗi máy chủ nội bộ'})
        }
    }
}

module.exports = new QuoteController();