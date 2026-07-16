const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
    addAddress,
    getAddresses,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
} = require("../controllers/addressController");

//═══════════════════════════════════════
// Add Address
//═══════════════════════════════════════

router.post(
    "/add",
    authMiddleware,
    addAddress
);

//════════════════════════════════════════
// Get All Addresses
//════════════════════════════════════════

router.get(
    "/",
    authMiddleware,
    getAddresses
);

//═════════════════════════════════════════
// Update Address
//═════════════════════════════════════════

router.put(
    "/:id",
    authMiddleware,
    updateAddress
);

//═════════════════════════════════════════
// Delete Address
//═════════════════════════════════════════

router.delete(
    "/:id",
    authMiddleware,
    deleteAddress
);

//═════════════════════════════════════════
// Set Default Address
//═════════════════════════════════════════

router.put(
    "/default/:id",
    authMiddleware,
    setDefaultAddress
);

module.exports = router;