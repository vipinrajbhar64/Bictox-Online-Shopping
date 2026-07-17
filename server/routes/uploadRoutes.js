const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

const {
    uploadProductImage,
} = require("../controllers/uploadController");

//═══════════════════════════════════════════════
// Upload Product Image
//═══════════════════════════════════════════════

router.post(
    "/product",
    authMiddleware,
    upload.single("image"),
    uploadProductImage
);

module.exports = router;