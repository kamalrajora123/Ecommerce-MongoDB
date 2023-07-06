
const offerController = require("../../controllers/adminController/offerController");
const offerValidators = require("../../validators/offerValidators")
const fileUpload = require("../../middlewares/fileupload");
const express = require("express");

const router = express.Router();

router.post("/offerAdd",  fileUpload.imageUpload.single("category_image"),offerController.insertOffer);
router.delete("/offerDelete",offerValidators.deleteOffer_query, offerController.deleteOffer);
router.get("/offerEdit",offerValidators.editOffer, offerController.editOffer);
router.put("/offerUpdate",offerValidators.updateOffer, offerController.updateOffer);
router.get("/offerViewAll", offerController.viewAll);


router.post("/offerStatusUpdate", offerValidators.updateOfferStatus,offerController.updateOfferStatus);

router.get("/offerPDF", offerController.exportOfferToPDF);


module.exports = router;