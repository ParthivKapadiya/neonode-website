import { promises as fs } from 'fs';
import path from 'path';
import type { ContactFormValues } from '@/schema/contact';
import { formatContactSubmission } from '@/lib/notifications/format-submission';
import { getEmailConfigStatus, sendContactEmail } from '@/lib/notifications/send-email';

const SUBMISSIONS_DIR = path.join(process.cwd(), 'submissions');
const SUBMISSIONS_FILE = path.join(SUBMISSIONS_DIR, 'contact-submissions.json');

export type NotifyResult = {
  emailSent: boolean;
  savedLocally: boolean;
  method?: 'smtp' | 'resend' | 'local';
};

async function saveSubmissionLocally(
  submission: ContactFormValues & { id: string; ip: string; submittedAt: string },
): Promise<boolean> {
  if (process.env.NODE_ENV === 'production') {
    return false;
  }

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
  return getEmailConfigStatus().configured;
}

export async function notifyOwner(
  data: ContactFormValues,
  meta: { id: string; ip: string; submittedAt: string },
): Promise<NotifyResult> {
  const formatted = formatContactSubmission(data, meta);
  const emailSent = await sendContactEmail(formatted);
  const savedLocally = await saveSubmissionLocally({ ...data, ...meta });

  let method: NotifyResult['method'] = 'local';
  if (emailSent) {
    method = getEmailConfigStatus().smtpUser ? 'smtp' : 'resend';
  }

  return { emailSent, savedLocally, method };
}
