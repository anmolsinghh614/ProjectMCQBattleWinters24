// Email is sent via Brevo's transactional email HTTP API (over HTTPS) instead
// of SMTP, because some hosts (e.g. Render's free tier) block outbound SMTP
// ports, which caused nodemailer to fail with "Connection timeout".

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

// The sender must be a verified sender in your Brevo account. Falls back to
// GMAIL_USER so an already-verified address can be reused.
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || process.env.GMAIL_USER;
const SENDER_NAME = process.env.BREVO_SENDER_NAME || "MCQ Battle";

if (!process.env.BREVO_API_KEY) {
  console.warn(
    "[mailer] BREVO_API_KEY is not set. OTP emails will fail until it is configured."
  );
}

// Lightweight startup check so bad/missing credentials surface immediately in logs.
async function verifyMailer() {
  if (!process.env.BREVO_API_KEY) return;
  try {
    const res = await fetch("https://api.brevo.com/v3/account", {
      headers: { "api-key": process.env.BREVO_API_KEY },
    });
    if (res.ok) {
      console.log("[mailer] Brevo API is ready to send emails.");
    } else {
      const body = await res.text();
      console.error(
        `[mailer] Brevo API verification FAILED (status ${res.status}): ${body}`
      );
    }
  } catch (error) {
    console.error("[mailer] Brevo API verification FAILED:", error);
  }
}
verifyMailer();

function buildOtpHtml(otp: string, username: string): string {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 25px; border-radius: 15px; background: linear-gradient(135deg, #ffafbd, #ffc3a0); color: #333; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);">
      <h1 style="text-align: center; font-size: 28px; color: #fff; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">✨ Welcome, ${username}! ✨</h1>
      <p style="font-size: 16px; text-align: center; margin-top: 20px;">We're thrilled to have you at <b>MCQ Battle</b>. Verify your email with the OTP below:</p>
      <div style="margin: 30px auto; width: fit-content; padding: 10px 30px; border-radius: 10px; background-color: rgba(255,255,255,0.7); backdrop-filter: blur(10px); box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
        <span style="font-size: 28px; letter-spacing: 5px; font-weight: bold; color: #e63946;">${otp}</span>
      </div>
      <p style="font-size: 14px; text-align: center; color: #ffffff; opacity: 0.9;">⏳ OTP expires in <strong>10 minutes</strong>. If you didn't request this, please disregard this message.</p>
    </div>
  `;
}

export async function sendOtpEmail(email: string, otp: string, username: string) {
  if (!process.env.BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY is not configured.");
  }
  if (!SENDER_EMAIL) {
    throw new Error("Sender email (BREVO_SENDER_EMAIL/GMAIL_USER) is not configured.");
  }

  try {
    const res = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: SENDER_NAME, email: SENDER_EMAIL },
        to: [{ email }],
        subject: "Verify Your MCQ Battle Account – OTP Inside!",
        htmlContent: buildOtpHtml(otp, username),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Brevo API responded ${res.status}: ${body}`);
    }
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email.");
  }
}
