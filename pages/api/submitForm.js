import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, phoneNumber, subject, message, clientEmail } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_SERVER,
      port: process.env.ZOHO_SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
      to: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
      subject: `New Contact Form Submission - ${subject}`,
      text: `
        Name: ${name}
        Phone Number: ${phoneNumber}
        Subject: ${subject}
        Message: ${message}
        Client Email: ${clientEmail}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
