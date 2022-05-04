const express = require('express');
const router=express.Router();
const ProductController=require('../controllers/ProductController');
const verifytoken = require('../middlewares/account');

// [User && Admin] Xem sản phẩm

router.get('/',ProductController.getProduct)


// [User && Admin] Lấy theo danh mục

router.get('/',ProductController.getProductWithCategory)

// [User && Admin] Xem chi tiết sản phẩm

router.get('/:id',ProductController.getProductDetail)

// [Admin] Tạo sản phẩm
router.post('/',ProductController.createProduct);

// [Admin] Cập nhật sản phẩm

router.put('/:id',ProductController.updateProduct);

// [Admin] Xoá sản phẩm

router.delete('/:id',ProductController.deleteProduct);

module.exports=router;