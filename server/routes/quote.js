const express = require('express');
const router = express.Router();
const QuoteController = require('../controllers/QuoteController');

// [User] Đăng kí nhận báo giá
router.post('/',QuoteController.createQuote);


// [Admin] Hiển thị dữ liệu khách hàng đăng kí nhận báo giá
// Sản phẩm khách hàng đăng kí

router.get("/",QuoteController.getQuote)

// [Admin] xoá khách hàng nhận báo giá
router.delete('/:id',QuoteController.deleteQuote)

module.exports=router;