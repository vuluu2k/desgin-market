const Order = require('../models/Order')

class OrderController{
    async getOrder(req, res){
        try {
            const orders= await Order.find({})
            res.json({success:true, orders: orders})
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({success:false ,message:'Lỗi máy chủ nội bộ'})
        }
    }
    async getOrderDetail(req, res){
        try {
            const order= await Order.findOne({_id:req.params.id})
            res.json({success:true, order: order})
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({success:false ,message:'Lỗi máy chủ nội bộ'})
        }
    }
    async createOrder(req, res){
        try {
            const data=req.body;
            const newOrder= new Order(data);
            newOrder.save();
            res.json({success:true,message:'Bạn đặt hàng thàng công',order:newOrder})
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({success:false ,message:'Lỗi máy chủ nội bộ'})
        }
    }
    async updateOrder(req, res){
        try {
            const data=req.body;
            let updateOrder= data;
            const updateOrderCondition={_id:req.params.id}
            updateOrder=await Order.findOneAndUpdate(updateOrderCondition,updateOrder,{new:true})
            if(!updateOrder){
                return res.status(401)
                            .json({success:false,message:'Cập nhật không thành công'})
            }
            res.json({success:true,message:'Bạn cập nhật đơn hàng thàng công',order:updateOrder})
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({success:false ,message:'Lỗi máy chủ nội bộ'})
        }
    }
    async deleteOrder(req, res){
        try {
            const orderDeleteCondition={_id:req.params.id};
            const deleteOrder=await Order.findOneAndDelete(orderDeleteCondition);
            if(!deleteOrder)
                return res.status(401)
                            .json({success:false,message:'Bạn đã xóa thành công đơn hàng này'});
            res.json({success:true,message:'xoá thành công'})
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({success:false ,message:'Lỗi máy chủ nội bộ'})
        }
    }
}

module.exports = new OrderController();