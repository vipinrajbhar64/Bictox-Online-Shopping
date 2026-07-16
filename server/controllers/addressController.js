const Address = require("../models/addressModel");

//═══════════════════════════════════════════════
// Add Address
//═══════════════════════════════════════════════

const addAddress = async (req, res) => {
    try {

        const {
            fullName,
            phone,
            address,
            city,
            state,
            pincode,
            country,
        } = req.body;

        const newAddress = await Address.create({
            user: req.user.userId,
            fullName,
            phone,
            address,
            city,
            state,
            pincode,
            country,
        });

        return res.status(201).json({
            success: true,
            message: "Address Added Successfully",
            address: newAddress,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};

//═══════════════════════════════════════════════
// Get All Addresses
//═══════════════════════════════════════════════

const getAddresses = async (req, res) => {
    try {

        const addresses = await Address.find({
            user: req.user.userId,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: addresses.length,
            addresses,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};

//═══════════════════════════════════════════════
// Update Address
//═══════════════════════════════════════════════

const updateAddress = async (req, res) => {
    try {

        const address = await Address.findOne({
            _id: req.params.id,
            user: req.user.userId,
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address Not Found",
            });
        }

        const updatedAddress = await Address.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Address Updated Successfully",
            address: updatedAddress,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};

//═══════════════════════════════════════════════
// Delete Address
//═══════════════════════════════════════════════

const deleteAddress = async (req, res) => {
    try {

        const address = await Address.findOne({
            _id: req.params.id,
            user: req.user.userId,
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address Not Found",
            });
        }

        await Address.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Address Deleted Successfully",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};

//═══════════════════════════════════════════════
// Set Default Address
//═══════════════════════════════════════════════

const setDefaultAddress = async (req, res) => {
    try {

        const address = await Address.findOne({
            _id: req.params.id,
            user: req.user.userId,
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address Not Found",
            });
        }

        // Remove old default address
        await Address.updateMany(
            { user: req.user.userId },
            { isDefault: false }
        );

        // Set new default
        address.isDefault = true;
        await address.save();

        return res.status(200).json({
            success: true,
            message: "Default Address Updated Successfully",
            address,
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
    addAddress,
    getAddresses,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
};