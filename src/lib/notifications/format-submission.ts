import type { ContactFormValues } from '@/schema/contact';

export type SubmissionMeta = {
  id: string;
  submittedAt: string;
  ip: string;
};

export type FormattedSubmission = {
  subject: string;
  text: string;
  html: string;
  whatsappText: string;
  replyTo: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function formatContactSubmission(
  data: ContactFormValues,
  meta: SubmissionMeta,
): FormattedSubmission {
  const services = data.services.join(', ');
  const submittedAt = new Date(meta.submittedAt).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || 'Not provided'}`,
    `Business: ${data.company}`,
    `Industry: ${data.industry}`,
    `Services: ${services}`,
    `Budget: ${data.budget}`,
    `Timeline: ${data.timeline}`,
    '',
    'Message:',
    data.message,
    '',
    `Submitted: ${submittedAt} IST`,
    `Reference ID: ${meta.id}`,
  ];

  const text = lines.join('\n');

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#111;">
      <h2 style="color:#3b82f6;margin:0 0 16px;">New Website Inquiry — NeoNode</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#666;width:120px;">Name</td><td style="padding:8px 0;"><strong>${escapeHtml(data.name)}</strong></td></tr>
        <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#666;">Phone</td><td style="padding:8px 0;">${escapeHtml(data.phone || 'Not provided')}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Business</td><td style="padding:8px 0;">${escapeHtml(data.company)}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Industry</td><td style="padding:8px 0;">${escapeHtml(data.industry)}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Services</td><td style="padding:8px 0;">${escapeHtml(services)}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Budget</td><td style="padding:8px 0;">${escapeHtml(data.budget)}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Timeline</td><td style="padding:8px 0;">${escapeHtml(data.timeline)}</td></tr>
      </table>
      <div style="margin-top:20px;padding:16px;background:#f4f4f5;border-radius:8px;">
        <p style="margin:0 0 8px;font-size:12px;color:#666;text-transform:uppercase;">Project Description</p>
        <p style="margin:0;white-space:pre-wrap;line-height:1.6;">${escapeHtml(data.message)}</p>
      </div>
      <p style="margin-top:20px;font-size:12px;color:#888;">
        ${escapeHtml(submittedAt)} IST · Ref ${escapeHtml(meta.id)}
      </p>
    </div>
  `.trim();

  const whatsappText = [
    '🆕 *New NeoNode Website Inquiry*',
    '',
    `👤 *${data.name}*`,
    `🏢 ${data.company}`,
    `📧 ${data.email}`,
    data.phone ? `📱 ${data.phone}` : null,
    `🏷️ ${data.industry}`,
    `💰 ${data.budget} · ⏱ ${data.timeline}`,
    `🛠 ${services}`,
    '',
    `💬 ${data.message.slice(0, 400)}${data.message.length > 400 ? '…' : ''}`,
    '',
    `🕐 ${submittedAt} IST`,
  ]
    .filter(Boolean)
    .join('\n');

  return {
    subject: `New Inquiry — ${data.company} (${data.name})`,
    text,
    html,
    whatsappText,
    replyTo: data.email,
  };
}
