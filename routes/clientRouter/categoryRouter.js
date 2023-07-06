
const categoryController = require("../../controllers/clientController/categoryControllers");
const categoryValidators = require("../../validators/categoryValidators")
const fileUpload = require("../../middlewares/fileupload");
const express = require("express");

const router = express.Router();

router.post("/categoryAdd",  fileUpload.imageUpload.single("category_image"),categoryController.insertCategory);
router.delete("/categoryDelete",categoryValidators.deleteCate_query, categoryController.deleteCategory);
router.get("/categoryEdit",categoryValidators.editCate, categoryController.editCategory);
router.put("/categoryUpdate",categoryValidators.updateCate, categoryController.updateCategory);
router.get("/categoryViewAll", categoryController.viewAll);
router.post("/categoryProduct", categoryController.searchProductByCategory);

router.post("/categoryStatusUpdate", categoryValidators.updateCatStatus,categoryController.updateCategoryStatus);

router.get("/categoryExcel",categoryController.exportToExcel);

router.get("/categoryPDF", categoryController.exportToPDF);


module.exports = router;