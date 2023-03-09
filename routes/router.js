const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const importData = require("../controller/userController");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(path.resolve(__dirname, "public")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/importFile", upload.single("file"), importData);

module.exports = router;
