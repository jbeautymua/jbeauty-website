import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "onboarding@resend.dev";
const OWNER_EMAIL = "jssbeautymua@gmail.com";

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

function ownerNotificationHtml(data: ContactData): string {
  const date = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 0;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background-color:#18181b;padding:28px 32px;text-align:center;">
            <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">JSSBeauty Enquiry</h1>
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td style="padding:28px 32px 12px;">
            <h2 style="margin:0;font-size:18px;font-weight:600;color:#18181b;">New Contact Form Submission</h2>
            <p style="margin:6px 0 0;font-size:13px;color:#6d6d78;">${date}</p>
          </td>
        </tr>

        <!-- Contact Details -->
        <tr>
          <td style="padding:12px 32px 24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fafafa;border:1px solid #e4e4e8;border-radius:6px;">
              <tr>
                <td style="padding:16px 20px;border-bottom:1px solid #e4e4e8;">
                  <span style="font-size:12px;color:#6d6d78;text-transform:uppercase;letter-spacing:0.5px;">Name</span><br/>
                  <span style="font-size:15px;color:#18181b;font-weight:600;">${data.name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 20px;border-bottom:1px solid #e4e4e8;">
                  <span style="font-size:12px;color:#6d6d78;text-transform:uppercase;letter-spacing:0.5px;">Email</span><br/>
                  <a href="mailto:${data.email}" style="font-size:15px;color:#18181b;text-decoration:none;">${data.email}</a>
                </td>
              </tr>
              ${
                data.phone
                  ? `<tr>
                <td style="padding:16px 20px;border-bottom:1px solid #e4e4e8;">
                  <span style="font-size:12px;color:#6d6d78;text-transform:uppercase;letter-spacing:0.5px;">Phone</span><br/>
                  <a href="tel:${data.phone}" style="font-size:15px;color:#18181b;text-decoration:none;">${data.phone}</a>
                </td>
              </tr>`
                  : ""
              }
              <tr>
                <td style="padding:16px 20px;">
                  <span style="font-size:12px;color:#6d6d78;text-transform:uppercase;letter-spacing:0.5px;">Message</span><br/>
                  <p style="margin:6px 0 0;font-size:14px;color:#1e1e24;line-height:1.6;">${data.message}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Reply CTA -->
        <tr>
          <td style="padding:0 32px 28px;" align="center">
            <a href="mailto:${data.email}" style="display:inline-block;padding:12px 28px;background-color:#18181b;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:6px;">Reply to ${data.name}</a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #e4e4e8;text-align:center;">
            <p style="margin:0;font-size:12px;color:#6d6d78;">This email was sent from the contact form on your JSS Beauty website.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function customerConfirmationHtml(data: ContactData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 0;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background-color:#18181b;padding:28px 32px;text-align:center;">
            <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">JSS Beauty</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <h2 style="margin:0 0 16px;font-size:20px;font-weight:600;color:#18181b;">Thank you, ${data.name}!</h2>
            <p style="margin:0 0 12px;font-size:15px;color:#1e1e24;line-height:1.6;">We have received your message and appreciate you reaching out to us.</p>
            <p style="margin:0 0 24px;font-size:15px;color:#1e1e24;line-height:1.6;">Our team will review your enquiry and get back to you within <strong>24 hours</strong>.</p>

            <!-- Divider -->
            <hr style="border:none;border-top:1px solid #e4e4e8;margin:24px 0;" />

            <p style="margin:0 0 16px;font-size:14px;color:#6d6d78;">In the meantime, feel free to connect with us:</p>

            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:6px 0;">
                  <a href="https://instagram.com/jbeauty_j" style="font-size:14px;color:#18181b;text-decoration:none;">Instagram &mdash; @jbeauty_j</a>
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0;">
                  <a href="https://widget.treatwell.co.uk/place/jss-beauty/" style="font-size:14px;color:#18181b;text-decoration:none;">Book on Treatwell</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #e4e4e8;text-align:center;">
            <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#18181b;">JSS Beauty</p>
            <p style="margin:0;font-size:12px;color:#6d6d78;">Wellington, London SM6 8NF</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendOwnerNotification(
  data: ContactData
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `New Contact Form Submission — ${data.name}`,
      html: ownerNotificationHtml(data),
    });

    if (error) {
      console.error("Failed to send owner notification:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Failed to send owner notification:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export async function sendCustomerConfirmation(
  data: ContactData
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: "Thank you for contacting JSS Beauty",
      html: customerConfirmationHtml(data),
    });

    if (error) {
      console.error("Failed to send customer confirmation:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Failed to send customer confirmation:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
