
const contactController = require("../../controllers/adminController/contactController");
const contactValidators = require("../../validators/contactValidators")
const fileUpload = require("../../middlewares/fileupload");
const express = require("express");

const router = express.Router();

router.post("/contactAdd",contactValidators.createContact, contactController.insertContact );
router.delete("/contactDelete",contactValidators.deleteContact_query, contactController.deleteContact);
router.get("/contactEdit",contactValidators.editContact, contactController.editContact);
router.put("/contactUpdate",contactValidators.updateContact, contactController.updateContact);
router.get("/contactViewAll", contactController.viewAll);



router.get("/contactExcel",contactController.exportToExcel);

router.get("/contactPDF", contactController.exportToPDF);


module.exports = router;