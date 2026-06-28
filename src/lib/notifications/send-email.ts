import nodemailer from 'nodemailer';
import { siteConfig } from '@/config/site';
import type { FormattedSubmission } from '@/lib/notifications/format-submission';

function getNotifyEmail(): string {
  return process.env.CONTACT_NOTIFY_EMAIL || siteConfig.email;
}

function getSmtpConfig() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) return null;

  return {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    user,
    pass,
    from: process.env.SMTP_FROM || `"NeoNode Web Solution" <${user}>`,
  };
}

async function sendViaSmtp(formatted: FormattedSubmission): Promise<boolean> {
  const config = getSmtpConfig();
  if (!config) return false;

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transporter.sendMail({
    from: config.from,
    to: getNotifyEmail(),
    replyTo: formatted.replyTo,
    subject: formatted.subject,
    text: formatted.text,
    html: formatted.html,
  });

  return true;
}

async function sendViaResend(formatted: FormattedSubmission): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from =
    process.env.RESEND_FROM_EMAIL || `NeoNode Contact <onboarding@resend.dev>`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [getNotifyEmail()],
      reply_to: formatted.replyTo,
      subject: formatted.subject,
      html: formatted.html,
      text: formatted.text,
    }),
  });

  if (!response.ok) {
    console.error('Resend email failed:', await response.text());
    return false;
  }

  return true;
}

export async function sendContactEmail(formatted: FormattedSubmission): Promise<boolean> {
  try {
    // Gmail SMTP first (same as PHPMailer with app password)
    if (getSmtpConfig()) {
      return await sendViaSmtp(formatted);
    }

    if (process.env.RESEND_API_KEY) {
      return await sendViaResend(formatted);
    }

    return false;
  } catch (error) {
    console.error('Email notification error:', error);
    return false;
  }
}

export function isEmailConfigured(): boolean {
  return Boolean(getSmtpConfig() || process.env.RESEND_API_KEY);
}
