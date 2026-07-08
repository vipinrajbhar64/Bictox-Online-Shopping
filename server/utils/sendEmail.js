const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("✅ Email Sent Successfully");
        console.log("Accepted :", info.accepted);
        console.log("Rejected :", info.rejected);
        console.log("Response :", info.response);
    } catch (error) {
        console.log("❌ Email Sending Failed");
        console.log(error.message);
    }
};

module.exports = sendEmail;