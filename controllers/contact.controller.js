const { z, success } = require("zod");
require("dotenv").config()
const {sendEmailToUser, sendEmailToTeam} = require("../middlewares/sendEmail")

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  brief: z.string().min(10),
});

const sendContactMail = async (req, res) => {

  try {
    const data = contactSchema.parse(req.body);

    setImmediate(async() => {
      try {
        await sendEmailToUser(data.name, data.email);

        await sendEmailToTeam(data.name, data.email, data.phone, data.brief);

        console.log("email sent successfully");

        return res.status(200).json({
          message: "email sent successfully",
          success: true
        })
      } catch (error) {
        console.log(error.message)
        return res.status(500).json({
          message: "failed to sent an email",
          error: error.message,
          success: false
        })
      }
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {sendContactMail};

// const nodemailer = require("nodemailer");
// const { z } = require("zod");
// const dotenv = require("dotenv");
// dotenv.config()

// const contactSchema = z.object({
//   name: z.string().min(1),
//   email: z.string().email(),
//   phone: z.string().optional(),
//   brief: z.string().min(10),
// });

// /* 🚀 Create transporter ONCE */
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT),
//   secure: false,
//   pool: true, // enable pooling
//   maxConnections: 5,
//   maxMessages: 100,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// const sendContactMail = async (req, res) => {
//   try {
//     const data = contactSchema.parse(req.body);

//     // ⚡ Respond instantly
//     res.status(200).json({ success: true });

//     // 🔥 Run email sending in background (non-blocking)
//     setImmediate(async () => {
//       try {
//         await Promise.all([
//           // Thank you email
//           transporter.sendMail({
//             from: `"Kryyvix Team" <${process.env.SMTP_USER}>`,
//             to: data.email,
//             subject: "Thank you for contacting Kryyvix 👋",
//             html: `<h2>Hi ${data.name}</h2><p>We received your message.</p>`,
//           }),

//           // Admin email
//           transporter.sendMail({
//             from: `"Kryyvix" <${process.env.SMTP_USER}>`,
//             to: process.env.RECEIVER_EMAIL,
//             replyTo: data.email,
//             subject: `New Contact Message - ${data.name}`,
//             html: `<p>${data.brief}</p>`,
//           }),
//         ]);

//         console.log("Emails sent successfully");
//       } catch (err) {
//         console.error("Email failed:", err);
//       }
//     });

//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// module.exports = { sendContactMail };

// // const nodemailer = require("nodemailer");
// // const { z } = require("zod");

// // const contactSchema = z.object({
// //   name: z.string().min(1),
// //   email: z.string().email(),
// //   phone: z.string().optional(),
// //   brief: z.string().min(10),
// // });

// // const sendContactMail = async (req, res) => {
// //   try {
// //     const data = contactSchema.parse(req.body);

// //     const transporter = nodemailer.createTransport({
// //       host: process.env.SMTP_HOST,
// //       port: Number(process.env.SMTP_PORT),
// //       secure: true,
// //       auth: {
// //         user: process.env.SMTP_USER,
// //         pass: process.env.SMTP_PASS,
// //       },
// //     });
    

// //      /* 1️⃣ THANK YOU EMAIL → USER */
// //     await transporter.sendMail({
// //       from: `"Kryyvix Team" <${process.env.SMTP_USER}>`,
// //       to: data.email,
// //       subject: "Thank you for contacting Kryyvix 👋",
// //       html: `
// //         <h2>Hi ${data.name},</h2>
// //         <p>Thank you for reaching out to <b>Kryyvix</b>.</p>
// //         <p>We’ve received your message and our team will review it shortly.</p>
// //         <p><b>What happens next?</b></p>
// //         <ul>
// //           <li>Our team will review your requirements</li>
// //           <li>We’ll get back to you within <b>24 hours</b></li>
// //         </ul>
// //         <p>Best regards,<br/>
// //         <b>Kryyvix Team</b></p>
// //       `,
// //     });

// //     /* 2️⃣ USER MESSAGE EMAIL → YOU (ADMIN) */
// //     await transporter.sendMail({
// //       from: `"Kryyvix : " <${process.env.SMTP_USER}>`,
// //       to: process.env.RECEIVER_EMAIL,
// //       replyTo: data.email,
// //       subject: `New Contact Message - ${data.name}`,
// //       html: `
// //         <h2>New Contact Form Submission</h2>
// //         <p><b>Name:</b> ${data.name}</p>
// //         <p><b>Email:</b> ${data.email}</p>
// //         <p><b>Phone:</b> ${data.phone || "N/A"}</p>
// //         <p><b>Message:</b></p>
// //         <p>${data.brief}</p>
// //       `,

// //     });
    
// //     console.log("email sent successfully....")
    
// //     return res.status(200).json({ success: true, message: "Sent Successfully." });
    

// //   } catch (error) {
// //     return res.status(400).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };


// // module.exports = {sendContactMail};
