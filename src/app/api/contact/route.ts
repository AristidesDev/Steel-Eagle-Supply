import { NextRequest, NextResponse } from "next/server";
import { sendMail, getRecipientEmail } from "@/lib/email";
import {
  ownerNotificationEmail,
  clientConfirmationEmail,
} from "@/lib/email-templates";

/**
 * POST /api/contact
 *
 * Secure contact/quote request handler.
 * Validates required fields, sanitizes input, and sends two emails:
 *   1. Notification to the site owner with full contact details.
 *   2. Confirmation to the client acknowledging receipt.
 *
 * SMTP configuration is read from environment variables so the
 * provider can be swapped without modifying this code.
 */

interface ContactPayload {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  materialType?: string;
  quantity?: string;
  specifications?: string;
  deliveryLocation?: string;
  message?: string;
}

const REQUIRED_FIELDS = ["name", "company", "email"] as const;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, 2000);
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();

    // Sanitize all fields
    const sanitized: Record<string, string> = {};
    for (const [key, value] of Object.entries(body)) {
      sanitized[key] = sanitize(value);
    }

    // Validate required fields
    for (const field of REQUIRED_FIELDS) {
      if (!sanitized[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    if (!isValidEmail(sanitized.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // ── Send emails ────────────────────────────────────────

    // 1. Notification to the site owner
    const ownerEmail = ownerNotificationEmail(sanitized);
    const ownerPromise = sendMail({
      to: getRecipientEmail(),
      subject: ownerEmail.subject,
      html: ownerEmail.html,
      text: ownerEmail.text,
    });

    // 2. Confirmation to the client
    const confirmEmail = clientConfirmationEmail(sanitized);
    const clientPromise = sendMail({
      to: sanitized.email,
      subject: confirmEmail.subject,
      html: confirmEmail.html,
      text: confirmEmail.text,
    });

    // Send both concurrently for speed
    await Promise.all([ownerPromise, clientPromise]);

    console.log("[Contact Form] Emails sent successfully", {
      timestamp: new Date().toISOString(),
      clientEmail: sanitized.email,
      company: sanitized.company,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Quote request received. Our team will respond within 24 business hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API Error]", error);

    // Distinguish between SMTP config errors and runtime errors
    const isConfigError =
      error instanceof Error && error.message.includes("Missing SMTP");

    return NextResponse.json(
      {
        error: isConfigError
          ? "Email service is not configured. Please contact us directly."
          : "Internal server error",
      },
      { status: isConfigError ? 503 : 500 }
    );
  }
}
