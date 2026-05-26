import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Secure contact/quote request handler.
 * Validates required fields, sanitizes input, and returns a structured response.
 * In production, this would forward to an email service (SendGrid, SES, etc.)
 * or write to a CRM/database.
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

    // In production, send email or store in database here.
    // For now, log the submission and return success.
    console.log("[Contact Form Submission]", {
      timestamp: new Date().toISOString(),
      ...sanitized,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Quote request received. Our team will respond within 24 business hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
