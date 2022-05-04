const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

// [GET] Lấy ra tất cả các đơn hàng
router.get('/',OrderController.getOrder)

// [GET] Lấy ra tất cả các đơn hàng
router.get('/:id',OrderController.getOrderDetail)

// [PUT] Cập nhật đơn hàng
router.put('/:id',OrderController.updateOrder)

// [POST] Đặt một đơn hàng
router.post('/',OrderController.createOrder)

// [DELETE] Xóa đơn hàng 
router.delete('/:id',OrderController.deleteOrder)

module.exports = router;