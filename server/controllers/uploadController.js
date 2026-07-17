//═══════════════════════════════════════════════
// Upload Product Image
//═══════════════════════════════════════════════

const uploadProductImage = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No Image Uploaded",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Image Uploaded Successfully",
            image: `/uploads/products/${req.file.filename}`,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};

module.exports = {
    uploadProductImage,
};