import { siteConfig } from '@/config/site';
import type { ContactFormValues } from '@/schema/contact';

export type SubmitContactResult =
  | { success: true; message: string }
  | { success: false; error: string };

type ContactApiStatus = {
  configured?: boolean;
};

async function getServerEmailConfigured(): Promise<boolean> {
  try {
    const response = await fetch('/api/contact');
    if (!response.ok) return false;
    const status = (await response.json()) as ContactApiStatus;
    return status.configured === true;
  } catch {
    return false;
  }
}

async function submitViaApi(data: ContactFormValues): Promise<SubmitContactResult> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (response.ok) {
    return {
      success: true,
      message: result.message || 'Thank you! We will contact you within 24 hours.',
    };
  }

  return {
    success: false,
    error: result.error || 'Failed to send message',
  };
}

async function submitViaFormSubmit(data: ContactFormValues): Promise<SubmitContactResult> {
  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(siteConfig.email)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Inquiry: ${data.company} — ${data.name}`,
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
        }),
      },
    );

    const result = await response.json();
    const ok = result.success === true || result.success === 'true';

    if (ok) {
      return {
        success: true,
        message: 'Thank you! We will contact you within 24 hours.',
      };
    }

    return {
      success: false,
      error: result.message || 'Failed to send message',
    };
  } catch {
    return {
      success: false,
      error: 'Network error. Please try again or contact us directly.',
    };
  }
}

export async function submitContactInquiry(data: ContactFormValues): Promise<SubmitContactResult> {
  const serverConfigured = await getServerEmailConfigured();

  if (serverConfigured) {
    const apiResult = await submitViaApi(data);
    if (apiResult.success) return apiResult;
  }

  return submitViaFormSubmit(data);
}
