const multer = require("multer");
const path = require("path");

//═══════════════════════════════════════════════
// Storage Configuration
//═══════════════════════════════════════════════

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/products");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );
    }

});

//═══════════════════════════════════════════════
// File Filter
//═══════════════════════════════════════════════

const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpg|jpeg|png|webp/;

    const isValid =
        allowedTypes.test(
            path.extname(file.originalname).toLowerCase()
        );

    if (isValid) {
        cb(null, true);
    } else {
        cb(new Error("Only Images Are Allowed"));
    }
};

//═══════════════════════════════════════════════
// Upload Middleware
//═══════════════════════════════════════════════

const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024,
    },

});

module.exports = upload;