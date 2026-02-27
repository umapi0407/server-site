const nodemailer = require("nodemailer");
const {sendToTeam, sendToUser} = require("../config/EmailTempate")

const sendEmailToUser = async (name, email) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"Kryyvix : " <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Thank you for contacting Kryyvix ",
            // text: `Please verify your email using the OTP provided.`,
            html: sendToUser(name),
        };

        await transporter.sendMail(mailOptions);
        console.log(`email sent to user`);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Email sending failed");
    }
};

const sendEmailToTeam = async(name, email, phone, brief) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"Kryyvix : " <${process.env.SMTP_USER}>`,
            to: process.env.RECEIVER_EMAIL,
            replyTo: email,
            subject: `New Contact Message - ${name}`,
            // text: `Please verify your email using the OTP provided.`,
            html: sendToTeam(name, email, phone, brief),
        };

        await transporter.sendMail(mailOptions);
        console.log(`email sent to team`);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Email sending failed");
    }
}

module.exports = {
    sendEmailToUser,
    sendEmailToTeam
};
