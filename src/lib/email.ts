import nodemailer from "nodemailer";

/**
 * Email Service — Nodemailer Transport
 *
 * Configured entirely via environment variables so the SMTP provider
 * can be swapped (Gmail, SendGrid, SES, etc.) without touching code.
 *
 * Required env vars:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS,
 *   SMTP_FROM_ADDRESS, SMTP_FROM_NAME, CONTACT_RECIPIENT_EMAIL
 *
 * Optional:
 *   SMTP_SECURE (defaults to false — uses STARTTLS on port 587)
 */

// ─── Config ────────────────────────────────────────────────

interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromAddress: string;
  fromName: string;
  recipientEmail: string;
}

function loadSmtpConfig(): SmtpConfig {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const fromAddress = process.env.SMTP_FROM_ADDRESS;
  const fromName = process.env.SMTP_FROM_NAME || "Steel Eagle Supply";
  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;

  if (!host || !port || !user || !pass || !fromAddress || !recipientEmail) {
    throw new Error(
      "[EmailService] Missing SMTP environment variables. " +
        "Ensure SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, " +
        "SMTP_FROM_ADDRESS, and CONTACT_RECIPIENT_EMAIL are defined in .env.local"
    );
  }

  return {
    host,
    port: parseInt(port, 10),
    secure: process.env.SMTP_SECURE === "true",
    user,
    pass,
    fromAddress,
    fromName,
    recipientEmail,
  };
}

// ─── Transport (lazy singleton) ────────────────────────────

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    const cfg = loadSmtpConfig();
    transporter = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.secure,
      auth: {
        user: cfg.user,
        pass: cfg.pass,
      },
    });
  }
  return transporter;
}

// ─── Public API ────────────────────────────────────────────

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  /** Optional plain-text fallback */
  text?: string;
}

/**
 * Send a single email through the configured SMTP transport.
 */
export async function sendMail(options: SendMailOptions): Promise<void> {
  const cfg = loadSmtpConfig();
  const transport = getTransporter();

  await transport.sendMail({
    from: `"${cfg.fromName}" <${cfg.fromAddress}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
    ...(options.text ? { text: options.text } : {}),
  });
}

/**
 * Returns the configured recipient email for the site owner.
 */
export function getRecipientEmail(): string {
  return loadSmtpConfig().recipientEmail;
}
