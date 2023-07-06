const productController = require("../../controllers/adminController/productControllers");

const productValidators = require("../../validators/productValidators")
const fileUpload = require("../../middlewares/fileupload");
const express = require("express");

const router = express.Router();

router.post("/productAdd", fileUpload.imageUpload.single("product_image"),productController.insertProduct);
router.delete("/productDelete",productValidators.deletePro_query, productController.deleteProduct);
router.get("/productEdit",productValidators.editPro, productController.editProduct);


router.get("/productExcel", productController.exportToExcel);

router.put("/productUpdate",productValidators.updatePro, productController.updateProduct);
// router.put( "/productUpdate",fileUpload.imageUpload.single("product_image"), productController.updateProduct);

router.get("/productViewAll", productController.viewAll);
router.post("/productStatusUpdate", productValidators.updateProductStatus,productController.updateProductStatus);

// router.put("/updateImage",productValidators.updateImage, productController.updateImage);

///router.post("/productImg", productController.updateProduct);

router.get("/productPDF", productController.exportToPDF);



module.exports = router;