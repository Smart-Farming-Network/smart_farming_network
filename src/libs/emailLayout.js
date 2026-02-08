import { emailBrand } from "./emailBrand";

export function emailLayout({ title, content }) {
    return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>${title}</title>
    </head>
    <body style="margin:0;padding:0;background:${emailBrand.backgroundColor};font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:40px 0;">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
              
              <tr>
                <td align="center" style="padding:24px;">
                  ${emailBrand.logoUrl
            ? `<img src="${emailBrand.logoUrl}" alt="${emailBrand.appName}" height="40" />`
            : `<h2 style="margin:0;color:${emailBrand.primaryColor};">${emailBrand.appName}</h2>`
        }
                </td>
              </tr>

              <tr>
                <td style="padding:24px;color:#212529;font-size:15px;line-height:1.6;">
                  ${content}
                </td>
              </tr>

              <tr>
                <td style="padding:16px;text-align:center;font-size:12px;color:#6c757d;">
                  © ${new Date().getFullYear()} ${emailBrand.appName}.<br/>
                  Need help? <a href="mailto:${emailBrand.supportEmail}">${emailBrand.supportEmail}</a>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}
