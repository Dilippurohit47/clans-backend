import nodemailer from "nodemailer";
import "dotenv/config";
export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
export const sendEmail = async (to, subject, body) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: to,
            subject: subject,
            html: body,
        });
        return info;
    }
    catch (error) {
        return error;
    }
};
