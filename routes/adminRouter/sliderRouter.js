
const sliderController = require("../../controllers/adminController/sliderController");
const sliderValidators = require("../../validators/sliderValidators")
const fileUpload = require("../../middlewares/fileupload");
const express = require("express");

const router = express.Router();

router.post("/sliderAdd",  fileUpload.imageUpload.single("slider_image"),sliderController.insertSlider);
router.delete("/sliderDelete",sliderValidators.deleteSlider_query, sliderController.deleteSlider);
router.get("/sliderEdit",sliderValidators.editSlider, sliderController.editSlider);
router.put("/sliderUpdate",sliderValidators.updateSlider, sliderController.updateSlider);
router.get("/sliderViewAll", sliderController.viewAll);


// router.post("/sliderSliderUpdate", sliderValidators.updateSliderStatus,sliderController.updateSliderStatus);

router.get("/sliderPDF", sliderController.exportSliderToPDF);


module.exports = router;