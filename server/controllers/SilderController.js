const Silder= require('../models/Silder')
const {cloudinary} = require('../utils/cloudinary');

class SilderController{
    async getImageSilder(req,res){
        try {
            const ImageSilders=await Silder.find({})
            res.json({success:true,image:ImageSilders})
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({success:false,message:'Lỗi máy chủ nội bộ'})
        }
    }
    async getImageDetail(req, res){
        try {
            const ImageDetail=await Silder.findOne({_id:req.params.id})
            res.json({success:true,image:ImageDetail})
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({success:false,message:'Lỗi máy chủ nội bộ'})
        }
    }
    async createImage(req,res){
        try {
            const data=req.body
            console.log(data);
            let uploadedResponse
            if(data.kind==="header")
                uploadedResponse = await cloudinary.uploader.upload(data.image,{
                    upload_preset:'tiendesign',
                    eager:{ width: 1665, height: 729, crop: "fill" }, 
                })
            else
                uploadedResponse = await cloudinary.uploader.upload(data.image,{
                    upload_preset:'tiendesign',
                    eager:{ width: 1084, height: 108, crop: "fill" }, 
                })
            const newImage=new Silder({
                imgIdPublic:uploadedResponse.public_id,
                imgUrl:uploadedResponse.eager[0].url,
                kind:data.kind
            })
            await newImage.save()
            res.json({success:true,message:'Chúc mừng bạn thêm thành công',image:newImage})
            
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({success:false,message:'Lỗi máy chủ nội bộ'})
        }
    }
    async updateImage(req,res){
        try{
            const data=req.body
            const image1= await Silder.findById({_id:req.params.id});

            let uploadedResponse
            if(data.kind==="header")
                uploadedResponse = await cloudinary.uploader.upload(data.imgUrl,{
                    public_id:image1.imgIdPublic,
                    overwrite:true,
                    eager:{ width: 840, height: 407, crop: "fill" }, 
                })
            else
                uploadedResponse = await cloudinary.uploader.upload(data.imgUrl,{
                    public_id:image1.imgIdPublic,
                    overwrite:true,
                    eager:{ width: 1084, height: 108, crop: "fill" }, 
                })
            let updateImage={
                imgIdPublic:uploadedResponse.public_id,
                imgUrl:uploadedResponse.eager[0].url,
                kind:data.kind
            }
            const imageUpdateCondition={_id:req.params.id}
            updateImage = await Silder.findOneAndUpdate(imageUpdateCondition,updateImage,{new:true});
            if(!updateImage){
                return res.status(401).json({success:false, message:'ảnh này không tồn tại'})
            }
            res.json({success:true,message:'Chúc mừng bạn thêm thành công',image:updateImage})
            
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({success:false,message:'Lỗi máy chủ nội bộ'})
        }
    }

    async deleteImage(req,res) {
        try {
            const imageDeleteCondition={_id:req.params.id};
            const image= await Silder.findById(imageDeleteCondition);
            const deleteImage= await Silder.findOneAndDelete(imageDeleteCondition);
            if(!deleteImage)
                return res.status(401)
                            .json({success:false,message:'Sản phẩm này không tồn tại'});
            await cloudinary.uploader.destroy(`${image.imgIdPublic}`)
            res.json({success:true,message:'Xoá thành công',image:deleteImage})
        } catch (e) {
            console.log(e);
            res.status(500)
                .json({success:false ,message:'Lỗi máy chủ nội bộ'})
        }
    }
}

module.exports= new SilderController();