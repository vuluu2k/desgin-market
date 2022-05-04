const Product = require("../models/Product");
const { cloudinary } = require("../utils/cloudinary");

class ProductController {
  async getProduct(req, res) {
    const {nameCar}=req.query;

    try {
      const products = await Product.find({$and:[nameCar&&nameCar!==String(undefined)&&{nameCar:{$regex:nameCar,$options:'i'}}||{}]});
      res.json({ success: true, products });
    } catch (e) {
      console.log(e);
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  }
  async getProductDetail(req, res) {
    try {
      const product = await Product.findOne({ _id: req.params.id });
      res.json({ success: true, product });
    } catch (e) {
      console.log(e);
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  }
  async createProduct(req, res) {
    const {
      nameCar,
      imgCarUrl,
      specicalCar,
      descriptionCar,
      seatsCar,
      madeInCar,
      sizeCar,
      lengthBaseCar,
      engineCar,
      workCapacityCar,
      fuelTypeCar,
      fuelCapacityCar,
      maxTorqueCar,
      gearCar,
      driveSystemCar,
      suspensionCar,
      brakeCar,
      powerSteerCar,
      plateSizeCar,
      lightCar,
      consumptionInCar,
      consumptionOutCar,
      consumptionCar,
      TypeCar,
      maxPowerCar,
      category,
      costCar,
    } = req.body;
    if (!nameCar)
      return res
        .status(400)
        .json({ success: false, message: "Tên của sản phẩm là bắt buộc" });
    // [Valiodation] Làm bên font-end
    try {
      const uploadedResponse = await cloudinary.uploader.upload(imgCarUrl, {
        upload_preset: "tiendesign",
        eager: { width: 900, height: 500, crop: "pad" },
      });
      console.log(uploadedResponse);
      const newProduct = new Product({
        nameCar,
        imgCarId: uploadedResponse.public_id,
        imgCarUrl: uploadedResponse.eager[0].url,
        specicalCar,
        descriptionCar,
        seatsCar,
        madeInCar,
        sizeCar,
        lengthBaseCar,
        engineCar,
        workCapacityCar,
        fuelTypeCar,
        fuelCapacityCar,
        maxTorqueCar,
        gearCar,
        driveSystemCar,
        suspensionCar,
        brakeCar,
        powerSteerCar,
        plateSizeCar,
        lightCar,
        consumptionInCar,
        consumptionOutCar,
        consumptionCar,
        TypeCar,
        maxPowerCar,
        category,
        costCar,
      });
      await newProduct.save();
      res.json({
        success: true,
        message: "Chúc mừng bạn thêm thành công!",
        product: newProduct,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  }


  async getProductWithCategory(req,res){
      const {category} = req.query;

      console.log(req.query)
      try {
          const graphics=await Product.find({category:category});
          if(!graphics) return res.status(403).json({ success: false, message: "Danh mục này không tồn tại"});
          return res.json({success:true,message:'Sản phẩm được tải lên',graphics})
          
      } catch (error) {
        console.log(e);
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
      }
  }

  async updateProduct(req, res) {
    const {
      nameCar,
      imgCarUrl,
      specicalCar,
      descriptionCar,
      seatsCar,
      madeInCar,
      sizeCar,
      lengthBaseCar,
      engineCar,
      workCapacityCar,
      fuelTypeCar,
      fuelCapacityCar,
      maxTorqueCar,
      gearCar,
      driveSystemCar,
      suspensionCar,
      brakeCar,
      powerSteerCar,
      plateSizeCar,
      lightCar,
      consumptionInCar,
      consumptionOutCar,
      consumptionCar,
      TypeCar,
      maxPowerCar,
      costCar,
      category,
    } = req.body;
    const product = await Product.findById({ _id: req.params.id });
    if (!nameCar)
      return res
        .status(400)
        .json({ success: false, message: "Tên sản phẩm là bắt buộc" });
    try {
      const uploadedResponse = await cloudinary.uploader.upload(imgCarUrl, {
        public_id: product.imgCarId,
        overwrite: true,
        eager: { width: 900, height: 500, crop: "pad" },
      });
      let updateProduct = {
        nameCar,
        imgCarId: uploadedResponse.public_id,
        imgCarUrl: uploadedResponse.eager[0].url,
        specicalCar,
        descriptionCar,
        seatsCar,
        madeInCar,
        sizeCar,
        lengthBaseCar,
        engineCar,
        workCapacityCar,
        fuelTypeCar,
        fuelCapacityCar,
        maxTorqueCar,
        gearCar,
        driveSystemCar,
        suspensionCar,
        brakeCar,
        powerSteerCar,
        plateSizeCar,
        lightCar,
        consumptionInCar,
        consumptionOutCar,
        consumptionCar,
        TypeCar,
        maxPowerCar,
        costCar,
        category,
      };
      const productUpdateCondition = { _id: req.params.id };
      updateProduct = await Product.findOneAndUpdate(
        productUpdateCondition,
        updateProduct,
        { new: true }
      );
      if (!updateProduct) {
        return res
          .status(401)
          .json({ success: false, message: "Sản phẩm này không tồn tại" });
      }
      res.json({
        success: true,
        message: "Cập nhật thành công",
        product: updateProduct,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  }
  async deleteProduct(req, res) {
    try {
      const productDeleteCondition = { _id: req.params.id };
      const product = await Product.findById({ _id: req.params.id });
      const deleteProduct = await Product.findOneAndDelete(
        productDeleteCondition
      );
      if (!deleteProduct)
        return res
          .status(401)
          .json({ success: false, message: "Sản phẩm này không tồn tại" });
      await cloudinary.uploader.destroy(`${product.imgCarId}`);
      res.json({
        success: true,
        message: "Xoá thành công",
        product: deleteProduct,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
  }
}

module.exports = new ProductController();
