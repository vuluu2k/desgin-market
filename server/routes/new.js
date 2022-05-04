const express = require('express');
const router = express.Router();
const NewController = require('../controllers/NewsController');

// [User & Admin] GET NEWS
router.get('/',NewController.getNew)

// [User && Admin] Xem chi tiết bài viết

router.get('/:id',NewController.getNewDetail)

// [Admin] Tạo bài viết
router.post('/',NewController.createNew);

// [Admin] Cập nhật bài viết

router.put('/:id',NewController.updateNew);

// [Admin] Xoá bài viết

router.delete('/:id',NewController.deleteNew);

module.exports = router;