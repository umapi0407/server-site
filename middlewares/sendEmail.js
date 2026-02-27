const nodemailer = require("nodemailer");
const {sendToTeam, sendToUser} = require("../config/EmailTemplate")

// Create transporter ONCE and reuse it
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 20000,  // 20 seconds to connect
    socketTimeout: 20000,      // 20 seconds for socket operations
    greetingTimeout: 10000,    // 10 seconds for SMTP greeting
});

// Verify connection on startup
transporter.verify((error, success) => {
    if (error) {
        console.log("Email service error:", error);
    } else {
        console.log("✅ Email service ready");
    }
});

const sendEmailToUser = async (name, email) => {
    try {
        const mailOptions = {
            from: `"Kryyvix : " <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Thank you for contacting Kryyvix ",
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
        const mailOptions = {
            from: `"Kryyvix : " <${process.env.SMTP_USER}>`,
            to: process.env.RECEIVER_EMAIL,
            replyTo: email,
            subject: `New Contact Message - ${name}`,
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

// const nodemailer = require("nodemailer");
// const {sendToTeam, sendToUser} = require("../config/EmailTemplate")
// require("dotenv").config();

// const sendEmailToUser = async (name, email) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.SMTP_USER,
//                 pass: process.env.SMTP_PASS,
//             },
//         });

//         const mailOptions = {
//             from: `"Kryyvix : " <${process.env.SMTP_USER}>`,
//             to: email,
//             subject: "Thank you for contacting Kryyvix ",
//             // text: `Please verify your email using the OTP provided.`,
//             html: sendToUser(name),
//         };

//         await transporter.sendMail(mailOptions);
//         console.log(`email sent to user`);
//     } catch (error) {
//         console.error("Error sending email:", error);
//         throw new Error("Email sending failed");
//     }
// };

// const sendEmailToTeam = async(name, email, phone, brief) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.SMTP_USER,
//                 pass: process.env.SMTP_PASS,
//             },
//         });

//         const mailOptions = {
//             from: `"Kryyvix : " <${process.env.SMTP_USER}>`,
//             to: process.env.RECEIVER_EMAIL,
//             replyTo: email,
//             subject: `New Contact Message - ${name}`,
//             // text: `Please verify your email using the OTP provided.`,
//             html: sendToTeam(name, email, phone, brief),
//         };

//         await transporter.sendMail(mailOptions);
//         console.log(`email sent to team`);
//     } catch (error) {
//         console.error("Error sending email:", error);
//         throw new Error("Email sending failed");
//     }
// }

// module.exports = {
//     sendEmailToUser,
//     sendEmailToTeam
// };


