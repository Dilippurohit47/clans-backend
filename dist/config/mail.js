import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOSt,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
export const sendEmail = async (to, subject, body) => {
    const info = await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: to,
        subject: subject,
        html: body,
    });
    console.log("Message sent: %s", info.messageId);
};
