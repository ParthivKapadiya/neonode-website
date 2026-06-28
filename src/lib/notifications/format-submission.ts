import type { ContactFormValues } from '@/schema/contact';
import { siteConfig } from '@/config/site';

export type SubmissionMeta = {
  id: string;
  submittedAt: string;
  ip: string;
};

export type FormattedSubmission = {
  subject: string;
  text: string;
  html: string;
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
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const phoneDisplay = data.phone || 'Not provided';
  const whatsappLink = data.phone
    ? `${siteConfig.whatsappUrl}?text=${encodeURIComponent(`Hi ${data.name}, thanks for your inquiry to NeoNode.`)}`
    : siteConfig.whatsappUrl;

  const lines = [
    'NEW WEBSITE INQUIRY — NEONODE WEB SOLUTION',
    '==========================================',
    '',
    `Name:         ${data.name}`,
    `Email:        ${data.email}`,
    `Phone:        ${phoneDisplay}`,
    `Business:     ${data.company}`,
    `Industry:     ${data.industry}`,
    `Services:     ${services}`,
    `Budget:       ${data.budget}`,
    `Timeline:     ${data.timeline}`,
    '',
    'PROJECT DESCRIPTION',
    '-------------------',
    data.message,
    '',
    'META',
    '----',
    `Submitted:    ${submittedAt} IST`,
    `Reference ID: ${meta.id}`,
    `IP Address:   ${meta.ip}`,
    '',
    `Reply to client: ${data.email}`,
  ];

  const text = lines.join('\n');

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#111;background:#fff;">
      <div style="background:linear-gradient(135deg,#3b82f6,#06b6d4);padding:24px 28px;border-radius:12px 12px 0 0;">
        <h1 style="margin:0;font-size:20px;color:#fff;">New Website Inquiry</h1>
        <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.85);">NeoNode Web Solution · Contact Form</p>
      </div>

      <div style="padding:28px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:12px 0;color:#6b7280;width:130px;vertical-align:top;">Name</td>
            <td style="padding:12px 0;"><strong style="font-size:15px;">${escapeHtml(data.name)}</strong></td>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:12px 0;color:#6b7280;vertical-align:top;">Email</td>
            <td style="padding:12px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color:#3b82f6;">${escapeHtml(data.email)}</a></td>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:12px 0;color:#6b7280;vertical-align:top;">Phone</td>
            <td style="padding:12px 0;">${escapeHtml(phoneDisplay)}</td>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:12px 0;color:#6b7280;vertical-align:top;">Business</td>
            <td style="padding:12px 0;">${escapeHtml(data.company)}</td>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:12px 0;color:#6b7280;vertical-align:top;">Industry</td>
            <td style="padding:12px 0;">${escapeHtml(data.industry)}</td>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:12px 0;color:#6b7280;vertical-align:top;">Services</td>
            <td style="padding:12px 0;">${escapeHtml(services)}</td>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:12px 0;color:#6b7280;vertical-align:top;">Budget</td>
            <td style="padding:12px 0;">${escapeHtml(data.budget)}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;color:#6b7280;vertical-align:top;">Timeline</td>
            <td style="padding:12px 0;">${escapeHtml(data.timeline)}</td>
          </tr>
        </table>

        <div style="margin-top:24px;padding:20px;background:#f9fafb;border-left:4px solid #3b82f6;border-radius:0 8px 8px 0;">
          <p style="margin:0 0 10px;font-size:11px;font-weight:bold;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Project Description</p>
          <p style="margin:0;white-space:pre-wrap;line-height:1.7;font-size:14px;color:#374151;">${escapeHtml(data.message)}</p>
        </div>

        <div style="margin-top:24px;text-align:center;">
          <a href="mailto:${escapeHtml(data.email)}?subject=${encodeURIComponent(`Re: Your NeoNode inquiry — ${data.company}`)}"
             style="display:inline-block;margin:4px;padding:12px 24px;background:#3b82f6;color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">
            Reply to ${escapeHtml(data.name)}
          </a>
          <a href="${whatsappLink}"
             style="display:inline-block;margin:4px;padding:12px 24px;background:#25D366;color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">
            WhatsApp Client
          </a>
        </div>

        <p style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:11px;color:#9ca3af;line-height:1.6;">
          ${escapeHtml(submittedAt)} IST<br/>
          Reference: ${escapeHtml(meta.id)} · IP: ${escapeHtml(meta.ip)}
        </p>
      </div>
    </div>
  `.trim();

  return {
    subject: `🌐 New Inquiry: ${data.company} — ${data.name}`,
    text,
    html,
    replyTo: data.email,
  };
}
