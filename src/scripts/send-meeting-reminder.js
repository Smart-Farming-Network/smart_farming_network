// scripts/send-meeting-reminder.js

import "dotenv/config";

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { mailer } from "../libs/mail.js";
import { emailLayout } from "../libs/emailLayout.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EMAIL_FILE = path.join(__dirname, "email.txt");

const APP_NAME = process.env.APP_NAME || "Goodlife Smart Farming Network";
const SMTP_USER = process.env.ZOHO_SMTP_USER;

const MEETING_LINK =
    "https://gsfn.teammanager.ng/meet/room/smart-agriculture-extension-training-2bd66e09-324e0b6d0c/";

if (!SMTP_USER) {
    throw new Error("ZOHO_SMTP_USER is not configured.");
}

const emailHtml = emailLayout({
    title: "Meeting Reminder – 5 October 2026",
    content: `
        <p>Dear Participant,</p>

        <p>
            This is a reminder of our meeting scheduled for today,
            <strong>5 October 2026, from 11:00 AM – 2:00 PM</strong>.
        </p>

        <p>
            <strong>Venue:</strong><br>
            BNARDA HALL,<br>
            Km 4 Old Otukpo Road, Makurdi.
        </p>

        <p>
            <strong>Meeting Link:</strong><br>
            <a href="${MEETING_LINK}">
                Join the Meeting
            </a>
        </p>

        <p>
            Kindly be available and join promptly.
        </p>

        <p>Thank you.</p>

        <p>
            Best regards,<br>
            <strong>Isaac Johnson</strong><br>
            Support Team
        </p>
    `,
});

async function main() {
    const fileContent = await fs.readFile(EMAIL_FILE, "utf8");

    const emails = [
        ...new Set(
            fileContent
                .split(/\r?\n/)
                .map((email) => email.trim().toLowerCase())
                .filter(Boolean)
        ),
    ];

    if (!emails.length) {
        console.log("No email addresses found in email.txt.");
        return;
    }

    console.log(`Found ${emails.length} unique email address(es).`);
    console.log("Starting bulk email...\n");

    const successful = [];
    const failed = [];

    for (const email of emails) {
        try {
            await mailer.sendMail({
                from: `"${APP_NAME}" <${SMTP_USER}>`,
                to: email,
                subject: "Meeting Reminder – 5 October 2026",
                html: emailHtml,
            });

            successful.push(email);
            console.log(`✓ Sent: ${email}`);
        } catch (error) {
            failed.push({
                email,
                error: error.message,
            });

            console.error(`✗ Failed: ${email}`);
            console.error(`  ${error.message}`);
        }
    }

    console.log("\n=================================");
    console.log("Bulk Email Completed");
    console.log("=================================");
    console.log(`Total:     ${emails.length}`);
    console.log(`Sent:      ${successful.length}`);
    console.log(`Failed:    ${failed.length}`);

    if (failed.length) {
        console.log("\nFailed emails:");

        for (const item of failed) {
            console.log(`- ${item.email}: ${item.error}`);
        }
    }
}

main().catch((error) => {
    console.error("Bulk email process failed:");
    console.error(error);
    process.exit(1);
});