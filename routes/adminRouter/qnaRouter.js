const qnaController = require("../../controllers/adminController/qnaControllers");
const qnaValidators = require("../../validators/qnaValidators")
const fileUpload = require("../../middlewares/fileupload");
const express = require("express");

const router = express.Router();

router.post("/questionAdd", fileUpload.imageUpload.single("question_image"),qnaController.insertQna);
router.delete("/questionDelete",qnaValidators.deleteQna_query, qnaController.deleteQna);
router.get("/questionEdit",qnaValidators.editQna, qnaController.editQna);
router.put("/questionUpdate",qnaValidators.updateQna, qnaController.updateQna);
router.get("/questionViewAll", qnaController.viewAll);
router.post("/qnaStatusUpdate", qnaValidators.updateQnaStatus,qnaController.updateQnaStatus);


router.get("/qnaExcel",qnaController.exportToExcel);

router.get("/qnaPDF", qnaController.exportToPDF);


module.exports = router;