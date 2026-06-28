import nodemailer from 'nodemailer';
import { siteConfig } from '@/config/site';
import type { FormattedSubmission } from '@/lib/notifications/format-submission';

function getNotifyEmail(): string {
  return process.env.CONTACT_NOTIFY_EMAIL || siteConfig.email;
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
    const error = await response.text();
    console.error('Resend email failed:', error);
    return false;
  }

  return true;
}

async function sendViaSmtp(formatted: FormattedSubmission): Promise<boolean> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return false;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || `"NeoNode Web Solution" <${SMTP_USER}>`,
    to: getNotifyEmail(),
    replyTo: formatted.replyTo,
    subject: formatted.subject,
    text: formatted.text,
    html: formatted.html,
  });

  return true;
}

export async function sendContactEmail(formatted: FormattedSubmission): Promise<boolean> {
  try {
    if (process.env.RESEND_API_KEY) {
      return await sendViaResend(formatted);
    }

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      return await sendViaSmtp(formatted);
    }

    return false;
  } catch (error) {
    console.error('Email notification error:', error);
    return false;
  }
}

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY ||
      (process.env.SMTP_USER && process.env.SMTP_PASS),
  );
}
