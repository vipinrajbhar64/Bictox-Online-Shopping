const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const Order = require("../models/orderModel");

//═══════════════════════════════════════════════
// Create Razorpay Order
//═══════════════════════════════════════════════

const createPaymentOrder = async (req, res) => {
    try {

        const { amount } = req.body;

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        return res.status(200).json({
            success: true,
            message: "Razorpay Order Created",
            order,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Payment Order Creation Failed",
        });

    }
};

//═══════════════════════════════════════════════
// Verify Razorpay Payment
//═══════════════════════════════════════════════

const verifyPayment = async (req, res) => {
    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId,
        } = req.body;

        const body =
            razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment Verification Failed",
            });
        }

        const order = await Order.findByIdAndUpdate(
            orderId,
            {
                paymentStatus: "Paid",
                razorpayOrderId: razorpay_order_id,
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature,
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Payment Verified Successfully",
            order,
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
    createPaymentOrder,
    verifyPayment,
};