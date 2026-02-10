import { NextResponse } from "next/server";
import { submitContactForm } from "@/lib/data";
import { sendOwnerNotification, sendCustomerConfirmation } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const result = await submitContactForm({ name, email, phone, message });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    // Send email notifications in parallel — don't block the response
    const emailResults = await Promise.allSettled([
      sendOwnerNotification({ name, email, phone, message }),
      sendCustomerConfirmation({ name, email, phone, message }),
    ]);

    for (const result of emailResults) {
      if (result.status === "rejected") {
        console.error("Email send failed:", result.reason);
      } else if (!result.value.success) {
        console.error("Email send error:", result.value.error);
      }
    }

    return NextResponse.json(
      { success: true, message: "Your message has been received. We will get back to you shortly." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
