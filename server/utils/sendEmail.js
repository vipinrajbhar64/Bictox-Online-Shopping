const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
    try {
        const response = await resend.emails.send({
            from: "Bictox <onboarding@resend.dev>",
            to: to,
            subject: subject,
            text: text,
        });

        console.log("✅ Email Sent Successfully");
        console.log(response);
    } catch (error) {
        console.log("❌ Email Sending Failed");
        console.log(error);
    }
};

module.exports = sendEmail;