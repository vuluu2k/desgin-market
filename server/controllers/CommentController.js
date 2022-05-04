const Comment = require('../models/Comment');


class CommentController{
    async createComment(req, res){
        const {nameComment,emailComment,contentComment,product,rate} = req.body;
        if(!nameComment||!emailComment)
            return res.status(400)
                        .json({success: false,message:'Tên và email là trường bắt buộc'});
        try {
            let newComment= new Comment({
                nameComment,emailComment,contentComment,product,rate
            })
            await newComment.save();
            res.json({success: true,message:'Bạn đã tạo một đánh giá',comment:newComment});
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({success: false,message:'Lỗi máy chủ nội bộ'});
        }
    }
    async updateComment(req, res){
        const {nameComment,emailComment,websiteComment,contentComment,product} = req.body;
        if(!nameComment||!emailComment)
            return res.status(400)
                        .json({success: false,message:'Tên và email là trường bắt buộc'});
        try {
            let updateComment= {
                nameComment,emailComment,websiteComment,contentComment,product
            }
            const updateCommentCondition={_id:req.params.id}
            updateComment=await Comment.findOneAndUpdate(updateCommentCondition,updateComment);
            if(!updateComment)
                return res.status(401)
                            .json({success:false,message:'Không có bài đánh giá này'})
            res.json({success: true,message:'Cập nhật thành công',comment:updateComment});
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({success: false,message:'Lỗi máy chủ nội bộ'});
        }
    }
    async deleteComment(req,res){
        try {
            const deleteCommentCondition={_id:req.params.id}
            const deleteComment=await Comment.findOneAndDelete(deleteCommentCondition)
            if(!deleteComment)
                return res.status(401)
                            .json({success:true,message:'Không có bài đánh giá này'});
            res.json({success:true,message:'Xoá thành công'})
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({success: false,message:'Lỗi máy chủ nội bộ'});
        }
    }
    async getCommentOnComment(req,res){
        const comment = await Comment.find({})
    }
    async getComment(req, res){
        try {
            const comments=await  Comment.find({product:req.params.slug});
            res.json({success:true,comments})
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({success: false,message:'Lỗi máy chủ nội bộ'});
        }
    }
}


module.exports = new CommentController();