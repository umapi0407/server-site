function sendToUser(name) {
    return `
    <!DOCTYPE>
    <html>
    <head>
        <title>Thank you to contact us</title>
    </head>
    <body>
        <h2>Hi ${name},</h2>
        <p>Thank you for reaching out to 
            <b>Kryyvix</b>.
        </p>
        <p>We’ve received your message and our team will review it shortly.</p>
        <p><b>What happens next?</b></p>
        <ul>
            <li>Our team will review your requirements</li>
            <li>We’ll get back to you within <b>24 hours</b></li>
        </ul>
        <p>Best regards,<br/>
            <b>Kryyvix Team</b>
        </p>
    </body>
    </html>
    `
}

function sendToTeam(name, email, phone, brief) {
    return `
    <!DOCTYPE>
    <html>
    <head>
        <title>Thank you to contact us</title>
    </head>
    <body>
        <h2>New Contact Form Submission</h2>
        <p>
            <b>Name:</b> ${name}
        </p>
        <p>
            <b>Email:</b> ${email}
        </p>
        <p>
            <b>Phone:</b> ${phone || "N/A"}
        </p>
        <p>
            <b>Message:</b>
        </p>
        <p>${brief}</p>
    </body>
    </html>
    `
}

module.exports = {
    sendToTeam,
    sendToUser
}
