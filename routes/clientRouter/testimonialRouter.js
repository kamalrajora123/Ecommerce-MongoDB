const testimonialController = require("../../controllers/clientController/testimonialControllers");
const testimonialValidators = require("../../validators/testimonialValidators")
const fileUpload = require("../../middlewares/fileupload");
const express = require("express");


const router = express.Router();

router.post("/TestAdd", fileUpload.imageUpload.single("testimonial_image"),testimonialController.insertTest);
router.delete("/TestDelete",testimonialValidators.deleteTest_query, testimonialController.deleteTest);
router.get("/Testedit",testimonialValidators.editTest, testimonialController.editTest);
router.put("/TestUpdate",testimonialValidators.updateTest, testimonialController.updateTest);
router.get("/TestViewAll", testimonialController.viewAll);
router.post("/TestStatusUpdate", testimonialValidators.updateTestStatus,testimonialController.updateTestStatus);



router.get("/TestExcel",testimonialController.exportToExcel);

router.get("/TestPDF", testimonialController.exportToPDF);

module.exports = router;

