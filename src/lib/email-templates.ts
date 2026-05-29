/**
 * Email HTML Templates for Steel Eagle Supply
 *
 * Two templates:
 *   1. ownerNotification — sent to the site admin with full contact details.
 *   2. clientConfirmation — sent to the client acknowledging receipt.
 *
 * Both share a consistent brand design.
 */

// ─── Design tokens ─────────────────────────────────────────

const BRAND = {
  name: "Steel Eagle Supply",
  primary: "#0F172A",
  secondary: "#1E3A8A",
  accent: "#F97316",
  muted: "#F3F4F6",
  white: "#FFFFFF",
  textDark: "#1E293B",
  textMuted: "#64748B",
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

// ─── Shared wrapper ────────────────────────────────────────

function emailWrapper(bodyContent: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Steel Eagle Supply</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.muted};font-family:${BRAND.fontFamily};">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${BRAND.muted};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background:${BRAND.white};border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,${BRAND.primary},${BRAND.secondary});padding:28px 32px;text-align:center;">
              <h1 style="margin:0;font-size:22px;font-weight:800;color:${BRAND.white};letter-spacing:0.5px;">
                🦅 ${BRAND.name}
              </h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              ${bodyContent}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:${BRAND.muted};padding:20px 32px;text-align:center;border-top:1px solid #E2E8F0;">
              <p style="margin:0;font-size:12px;color:${BRAND.textMuted};line-height:1.6;">
                © ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.<br />
                Houston, TX — Latin America Operations
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Helper: build key-value rows ──────────────────────────

function detailRow(label: string, value: string): string {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:8px 12px;font-size:13px;font-weight:600;color:${BRAND.secondary};white-space:nowrap;vertical-align:top;border-bottom:1px solid #F1F5F9;">
        ${label}
      </td>
      <td style="padding:8px 12px;font-size:13px;color:${BRAND.textDark};border-bottom:1px solid #F1F5F9;">
        ${escapeHtml(value)}
      </td>
    </tr>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br />");
}

// ─── Field label mapping ───────────────────────────────────

const fieldLabels: Record<string, { en: string; es: string }> = {
  name: { en: "Full Name", es: "Nombre Completo" },
  company: { en: "Company", es: "Empresa" },
  email: { en: "Email", es: "Correo Electrónico" },
  phone: { en: "Phone", es: "Teléfono" },
  materialType: { en: "Material Type", es: "Tipo de Material" },
  quantity: { en: "Quantity", es: "Cantidad" },
  specifications: { en: "Technical Specifications", es: "Especificaciones Técnicas" },
  deliveryLocation: { en: "Delivery Location", es: "Ubicación de Entrega" },
  message: { en: "Message", es: "Mensaje" },
};

// ─── 1. Owner Notification ─────────────────────────────────

export function ownerNotificationEmail(data: Record<string, string>): {
  subject: string;
  html: string;
  text: string;
} {
  const displayName = data.name || "Unknown";
  const company = data.company || "N/A";

  // Build detail rows
  const fields = [
    "name", "company", "email", "phone",
    "materialType", "quantity", "specifications",
    "deliveryLocation", "message",
  ];

  const rows = fields
    .map((key) => detailRow(fieldLabels[key]?.en || key, data[key] || ""))
    .filter(Boolean)
    .join("");

  const body = `
    <h2 style="margin:0 0 4px;font-size:18px;font-weight:700;color:${BRAND.primary};">
      New Quote Request
    </h2>
    <p style="margin:0 0 20px;font-size:13px;color:${BRAND.textMuted};">
      Submitted on ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} at ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
    </p>

    <div style="background:${BRAND.muted};border-radius:8px;padding:4px;margin-bottom:24px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
        ${rows}
      </table>
    </div>

    <p style="margin:0;font-size:13px;color:${BRAND.textMuted};">
      Reply directly to <a href="mailto:${escapeHtml(data.email || "")}" style="color:${BRAND.secondary};text-decoration:underline;">${escapeHtml(data.email || "")}</a> to respond to this inquiry.
    </p>
  `;

  // Plain text fallback
  const textLines = fields
    .filter((key) => data[key])
    .map((key) => `${fieldLabels[key]?.en || key}: ${data[key]}`)
    .join("\n");

  return {
    subject: `📩 New Quote Request — ${displayName} (${company})`,
    html: emailWrapper(body),
    text: `New Quote Request from ${displayName} (${company})\n\n${textLines}\n\nSubmitted: ${new Date().toISOString()}`,
  };
}

// ─── 2. Client Confirmation ────────────────────────────────

export function clientConfirmationEmail(data: Record<string, string>): {
  subject: string;
  html: string;
  text: string;
} {
  const clientName = data.name || "Valued Customer";

  const body = `
    <h2 style="margin:0 0 16px;font-size:18px;font-weight:700;color:${BRAND.primary};">
      Thank You, ${escapeHtml(clientName)}!
    </h2>

    <p style="margin:0 0 16px;font-size:14px;color:${BRAND.textDark};line-height:1.7;">
      We have received your quote request and our team is already reviewing your requirements.
      You can expect a detailed response within <strong>24 business hours</strong>.
    </p>

    <div style="background:linear-gradient(135deg,${BRAND.primary},${BRAND.secondary});border-radius:8px;padding:20px 24px;margin-bottom:24px;">
      <p style="margin:0;font-size:14px;font-weight:600;color:${BRAND.accent};">
        What happens next?
      </p>
      <ul style="margin:12px 0 0;padding-left:18px;font-size:13px;color:rgba(255,255,255,0.9);line-height:1.8;">
        <li>Our engineers will review your material specifications</li>
        <li>We'll prepare a competitive price quote</li>
        <li>A sales representative will contact you to discuss details</li>
      </ul>
    </div>

    <p style="margin:0 0 8px;font-size:14px;color:${BRAND.textDark};line-height:1.7;">
      If you need to reach us before then, email us directly at
      <a href="mailto:sales@steeleaglesupply.com" style="color:${BRAND.secondary};text-decoration:underline;font-weight:600;">sales@steeleaglesupply.com</a>.
    </p>

    <hr style="border:none;border-top:1px solid #E2E8F0;margin:24px 0;" />

    <p style="margin:0;font-size:12px;color:${BRAND.textMuted};line-height:1.6;">
      <em>Gracias por contactarnos. Hemos recibido su solicitud de cotización y nuestro equipo la está revisando. Recibirá una respuesta dentro de las próximas 24 horas hábiles.</em>
    </p>
  `;

  return {
    subject: `✅ Steel Eagle Supply — We've Received Your Request`,
    html: emailWrapper(body),
    text: `Hello ${clientName},\n\nThank you for reaching out to Steel Eagle Supply. We've received your quote request and our team will respond within 24 business hours.\n\nIf you need urgent assistance, email us at sales@steeleaglesupply.com.\n\nBest regards,\nSteel Eagle Supply Team`,
  };
}
