import { promises as fs } from 'fs';
import path from 'path';
import type { ContactFormValues } from '@/schema/contact';
import { formatContactSubmission } from '@/lib/notifications/format-submission';
import { isEmailConfigured, sendContactEmail } from '@/lib/notifications/send-email';
import { isWhatsAppConfigured, sendContactWhatsApp } from '@/lib/notifications/send-whatsapp';

const SUBMISSIONS_DIR = path.join(process.cwd(), 'submissions');
const SUBMISSIONS_FILE = path.join(SUBMISSIONS_DIR, 'contact-submissions.json');

export type NotifyResult = {
  emailSent: boolean;
  whatsappSent: boolean;
  savedLocally: boolean;
};

async function saveSubmissionLocally(
  submission: ContactFormValues & { id: string; ip: string; submittedAt: string },
): Promise<boolean> {
  try {
    await fs.mkdir(SUBMISSIONS_DIR, { recursive: true });

    let existing: typeof submission[] = [];
    try {
      const file = await fs.readFile(SUBMISSIONS_FILE, 'utf-8');
      existing = JSON.parse(file);
    } catch {
      existing = [];
    }

    existing.push(submission);
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(existing, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Local submission save failed:', error);
    return false;
  }
}

export function isNotificationConfigured(): boolean {
  return isEmailConfigured() || isWhatsAppConfigured();
}

export async function notifyOwner(
  data: ContactFormValues,
  meta: { id: string; ip: string; submittedAt: string },
): Promise<NotifyResult> {
  const formatted = formatContactSubmission(data, meta);

  const [emailResult, whatsappResult] = await Promise.allSettled([
    sendContactEmail(formatted),
    sendContactWhatsApp(formatted.whatsappText),
  ]);

  const emailSent = emailResult.status === 'fulfilled' && emailResult.value;
  const whatsappSent = whatsappResult.status === 'fulfilled' && whatsappResult.value;

  const savedLocally = await saveSubmissionLocally({ ...data, ...meta });

  return { emailSent, whatsappSent, savedLocally };
}
