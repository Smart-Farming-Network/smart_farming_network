import { emailLayout } from "../emailLayout";
import { emailBrand } from "../emailBrand";

export function resetPasswordEmail({ resetLink }) {
    return emailLayout({
        title: "Reset your password",
        content: `
      <p>Hello,</p>

      <p>
        You requested to reset your password. Click the button below to continue.
      </p>

      <p style="text-align:center;margin:32px 0;">
        <a href="${resetLink}"
           style="
             background:${emailBrand.primaryColor};
             color:#ffffff;
             padding:12px 20px;
             border-radius:6px;
             text-decoration:none;
             font-weight:bold;
             display:inline-block;
           ">
          Reset Password
        </a>
      </p>

      <p>
        This link will expire in <strong>30 minutes</strong>.
        If you didn’t request this, you can safely ignore this email.
      </p>

      <p style="margin-top:32px;">
        — ${emailBrand.appName} Team
      </p>
    `,
    });
}
