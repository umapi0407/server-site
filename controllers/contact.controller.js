const nodemailer = require("nodemailer");
const { z } = require("zod");

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  brief: z.string().min(10),
});

const sendContactMail = async (req, res) => {
  try {
    const data = contactSchema.parse(req.body);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    
    res.status(200).json({ success: true });

     /* 1️⃣ THANK YOU EMAIL → USER */
    await transporter.sendMail({
      from: `"Kryyvix Team" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: "Thank you for contacting Kryyvix 👋",
      html: `
        <h2>Hi ${data.name},</h2>
        <p>Thank you for reaching out to <b>Kryyvix</b>.</p>
        <p>We’ve received your message and our team will review it shortly.</p>
        <p><b>What happens next?</b></p>
        <ul>
          <li>Our team will review your requirements</li>
          <li>We’ll get back to you within <b>24 hours</b></li>
        </ul>
        <p>Best regards,<br/>
        <b>Kryyvix Team</b></p>
      `,
    });

    /* 2️⃣ USER MESSAGE EMAIL → YOU (ADMIN) */
    await transporter.sendMail({
      from: `"Kryyvix : " <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: data.email,
      subject: `New Contact Message - ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone:</b> ${data.phone || "N/A"}</p>
        <p><b>Message:</b></p>
        <p>${data.brief}</p>
      `,

    });
    console.log("email sent successfully....")

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {sendContactMail};
