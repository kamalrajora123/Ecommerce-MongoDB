const multer = require("multer");
const config = require("../config/config.json");
const path = require("path");

const imageStorage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

module.exports.imageUpload = multer({
  storage: imageStorage,

  limits: {
    fieldSize: config.fileSize,
  },

  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});
