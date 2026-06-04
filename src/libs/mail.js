import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST,
    port: Number(process.env.ZOHO_SMTP_PORT),
    secure: true,
    auth: {
        user: process.env.ZOHO_SMTP_USER,
        pass: process.env.ZOHO_SMTP_PASS,
    },
});

export async function sendMail({
    to,
    subject,
    html
}) {

    return await mailer.sendMail({
        from: `"${process.env.APP_NAME || "Support"}" <${process.env.ZOHO_SMTP_USER}>`,
        to,
        subject,
        html
    });

}