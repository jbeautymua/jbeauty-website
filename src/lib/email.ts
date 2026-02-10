import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "onboarding@resend.dev";
const OWNER_EMAIL = "swanju2003@yahoo.co.in";

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function sendOwnerNotification(
  data: ContactData
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `New Contact Form Submission — ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
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
      html: `
        <h2>Thank you, ${data.name}!</h2>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <p>If you need immediate assistance, feel free to reach us on Instagram <a href="https://instagram.com/jbeauty_j">@jbeauty_j</a>.</p>
        <br />
        <p>Best regards,</p>
        <p><strong>JSS Beauty</strong></p>
      `,
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
