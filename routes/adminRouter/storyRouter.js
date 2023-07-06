
const storyController = require("../../controllers/adminController/storyController");
const storyValidators = require("../../validators/storyValidators")
const fileUpload = require("../../middlewares/fileupload");
const express = require("express");

const router = express.Router();

router.post("/storyAdd",  fileUpload.imageUpload.single("client_image"),storyController.insertStory);
router.delete("/storyDelete",storyValidators.deleteStory_query, storyController.deleteStory);
router.get("/storyEdit",storyValidators.editStory, storyController.editStory);
router.put("/storyUpdate",storyValidators.updateStory, storyController.updateStory);
router.get("/storyViewAll", storyController.viewAll);

router.post("/storyStatusUpdate", storyValidators.updateStoryStatus,storyController.updateStoryStatus);

module.exports = router;