import nodemailer from 'nodemailer';
import { siteConfig } from '@/config/site';
import type { FormattedSubmission } from '@/lib/notifications/format-submission';
import type { ContactFormValues } from '@/schema/contact';
import type { SubmissionMeta } from '@/lib/notifications/format-submission';

function env(name: string): string | undefined {
  const value = process.env[name];
  return value?.trim() || undefined;
}

export function getNotifyEmail(): string {
  return env('CONTACT_NOTIFY_EMAIL') || siteConfig.email;
}

export function getEmailConfigStatus() {
  const smtpUser = env('SMTP_USER') || env('GMAIL_USER');
  const smtpPass = env('SMTP_PASS') || env('GMAIL_APP_PASSWORD');
  const resend = env('RESEND_API_KEY');

  return {
    configured: Boolean((smtpUser && smtpPass) || resend),
    smtpUser: Boolean(smtpUser),
    smtpPass: Boolean(smtpPass),
    resend: Boolean(resend),
    notifyEmail: getNotifyEmail(),
    runtime: 'nodejs' as const,
  };
}

function getSmtpConfig() {
  const user = env('SMTP_USER') || env('GMAIL_USER');
  const pass = env('SMTP_PASS') || env('GMAIL_APP_PASSWORD');

  if (!user || !pass) return null;

  return {
    host: env('SMTP_HOST') || 'smtp.gmail.com',
    port: Number(env('SMTP_PORT')) || 587,
    secure: env('SMTP_SECURE') === 'true',
    user,
    pass,
    from: env('SMTP_FROM') || `"NeoNode Web Solution" <${user}>`,
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
  const apiKey = env('RESEND_API_KEY');
  if (!apiKey) return false;

  const from = env('RESEND_FROM_EMAIL') || `NeoNode Contact <onboarding@resend.dev>`;

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

async function sendViaFormSubmit(
  data: ContactFormValues,
  formatted: FormattedSubmission,
  meta: SubmissionMeta,
): Promise<boolean> {
  const targetEmail = getNotifyEmail();
  const siteUrl =
    env('NEXT_PUBLIC_SITE_URL') ||
    (env('VERCEL_URL') ? `https://${env('VERCEL_URL')}` : siteConfig.url);

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: siteUrl,
        Referer: `${siteUrl}/contact`,
      },
      body: JSON.stringify({
        _subject: formatted.subject,
        _template: 'table',
        _captcha: 'false',
        _replyto: data.email,
        name: data.name,
        email: data.email,
        phone: data.phone || 'Not provided',
        company: data.company,
        industry: data.industry,
        services: data.services.join(', '),
        budget: data.budget,
        timeline: data.timeline,
        message: data.message,
        reference_id: meta.id,
        submitted_at: meta.submittedAt,
      }),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      console.error('FormSubmit failed:', result ?? response.statusText);
      return false;
    }

    return result?.success === true || result?.success === 'true';
  } catch (error) {
    console.error('FormSubmit error:', error);
    return false;
  }
}

export async function sendContactEmail(
  formatted: FormattedSubmission,
  data?: ContactFormValues,
  meta?: SubmissionMeta,
): Promise<boolean> {
  try {
    if (getSmtpConfig()) {
      return await sendViaSmtp(formatted);
    }

    if (env('RESEND_API_KEY')) {
      return await sendViaResend(formatted);
    }

    if (data && meta) {
      return await sendViaFormSubmit(data, formatted, meta);
    }

    return false;
  } catch (error) {
    console.error('Email notification error:', error);
    return false;
  }
}

export function isEmailConfigured(): boolean {
  return getEmailConfigStatus().configured;
}
