const New = require('../models/News');
const { cloudinary } = require('../utils/cloudinary');

class NewsController {

    async getNew(req, res) {
        try {
            const news = await New.find({}).sort({createdAt: -1});
            res.json({ success: true, news })
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({ success: false, message: 'Lỗi máy chủ nội bộ' });
        }
    }
    async getNewDetail(req, res) {
        try {
            const news = await New.findOne({ _id: req.params.id })
            res.json({ success: true, news })
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({ success: false, message: 'Lỗi máy chủ nội bộ' })
        }
    }

    async createNew(req, res) {
        const {
            titleNew,
            contentNew,
            imageNewUrl,
            costCar,
            logoSize,
            logoType,
            imageNewId,
            
        } = req.body;
        if (!titleNew)
            return res.status(400)
                .json({ success: false, message: 'tiêu đề logo là bắt buộc' });
        // [Valiodation] Làm bên font-end
        try {
            const uploadedResponse = await cloudinary.uploader.upload(imageNewUrl, {
                upload_preset: 'tiendesign',
                eager: { width: 900, height: 500, crop: "pad" },
            })
            console.log(uploadedResponse);
            const newNew = new New({
                titleNew,
                imageNewId: uploadedResponse.public_id,
                imageNewUrl: uploadedResponse.eager[0].url,
                contentNew,
                costCar,
                logoSize,
                logoType
            })
            await newNew.save();
            res.json({ success: true, message: 'Chúc mừng bạn thêm thành công!', new: newNew });
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({ success: false, message: 'Lỗi máy chủ nội bộ' })
        }
    }
    async updateNew(req, res) {
        const {
            titleNew,
            contentNew,
            imageNewUrl,
            imageNewId,
            costCar,
            logoSize,
            logoType,
        } = req.body;
        const news = await New.findById({ _id: req.params.id });
        console.log(news);
        if (!titleNew)
            return res.status(400)
                .json({ success: false, message: 'Tiêu đề bài viết là bắt buộc' });
        try {
            const uploadedResponse = await cloudinary.uploader.upload(imageNewUrl, {
                public_id: news.imageNewId,
                overwrite: true,
                eager: { width: 900, height: 500, crop: "pad" },
            })
            let updateNew = {
                titleNew,
                imageNewId: uploadedResponse.public_id,
                imageNewUrl: uploadedResponse.eager[0].url,
                contentNew,costCar,
                logoSize,
                logoType,
            }
            const newUpdateCondition = { _id: req.params.id }
            updateNew = await New.findOneAndUpdate(newUpdateCondition, updateNew, { news: true });
            if (!updateNew) {
                return res.status(401).json({ success: false, message: 'Bài viết này không tồn tại' })
            }
            res.json({ success: true, message: 'Cập nhật thành công', news: updateNew })
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({ success: false, message: 'Lỗi máy chủ nội bộ' })
        }
    }
    async deleteNew(req, res) {
        try {
            const newDeleteCondition = { _id: req.params.id };
            const news = await New.findById({ _id: req.params.id });
            const deleteNew = await New.findOneAndDelete(newDeleteCondition);
            if (!deleteNew)
                return res.status(401)
                    .json({ success: false, message: 'Bài viết này không tồn tại' });
            await cloudinary.uploader.destroy(`${news.imageNewId}`)
            res.json({ success: true, message: 'Xoá thành công', news: deleteNew })
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({ success: false, message: 'Lỗi máy chủ nội bộ' })
        }
    }
}

module.exports = new NewsController();