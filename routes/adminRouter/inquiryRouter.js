
const inquiryController = require("../../controllers/adminController/inquiryController");
const inquiryValidators = require("../../validators/inquiryValidators")
const fileUpload = require("../../middlewares/fileupload");
const express = require("express");

const router = express.Router();

router.post("/inquiryAdd",inquiryValidators.createinquiry, inquiryController.insertInquiry );
router.delete("/inquiryDelete",inquiryValidators.deleteinquiry_query, inquiryController.deleteInquiry);
router.get("/inquiryEdit",inquiryValidators.editinquiry, inquiryController.editInquiry);
router.put("/inquiryUpdate",inquiryValidators.updateinquiry, inquiryController.updateInquiry);
router.get("/inquiryViewAll", inquiryController.viewAll);



module.exports = router;