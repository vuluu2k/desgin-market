const express = require('express');
const router= express.Router();
const SilderController = require('../controllers/SilderController');

// [GET] xem ảnh đang trình chiếu silder+
router.get('/',SilderController.getImageSilder)
// [GET] xem chi tiết ảnh
router.get('/:id',SilderController.getImageDetail)

// [POST] tạo một ảnh cho silder
router.post('/',SilderController.createImage)
// [PUT] sửa một ảnh cho silder
router.put('/:id',SilderController.updateImage)
// [DELETE] Xóa một ảnh trên silder
router.delete('/:id',SilderController.deleteImage)

module.exports = router;