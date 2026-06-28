import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/schema/contact';
import { siteConfig } from '@/config/site';
import { isNotificationConfigured, notifyOwner } from '@/lib/notifications/notify';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 50_000;
const RATE_LIMIT = Number(process.env.CONTACT_RATE_LIMIT) || 10;
const RATE_WINDOW_MS = 60 * 60 * 1000;

const ipHits = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);

  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 415 });
    }

    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later or email us directly.',
          fallbackEmail: siteConfig.email,
        },
        { status: 429 },
      );
    }

    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Request body too large' }, { status: 413 });
    }

    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const meta = {
      id: crypto.randomUUID(),
      ip,
      submittedAt: new Date().toISOString(),
    };

    if (!isNotificationConfigured() && process.env.NODE_ENV === 'production') {
      console.error('Contact form: Gmail SMTP not configured');
      return NextResponse.json(
        {
          error: 'Contact form email is not configured. Please email us directly.',
          fallbackEmail: siteConfig.email,
        },
        { status: 503 },
      );
    }

    const { emailSent, savedLocally } = await notifyOwner(parsed.data, meta);

    if (isNotificationConfigured() && !emailSent) {
      console.error('[Contact form] Email failed for', meta.id);
      return NextResponse.json(
        {
          error: 'Failed to send your inquiry. Please email us directly.',
          fallbackEmail: siteConfig.email,
        },
        { status: 500 },
      );
    }

    if (!emailSent && !savedLocally) {
      return NextResponse.json(
        {
          error: 'Failed to save inquiry. Please email us directly.',
          fallbackEmail: siteConfig.email,
        },
        { status: 500 },
      );
    }

    console.info('[Contact form]', meta.id, parsed.data.name, parsed.data.email, emailSent ? 'emailed' : 'saved locally');

    return NextResponse.json({
      success: true,
      message: `Thank you! We will contact you at ${parsed.data.email} within 24 hours.`,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong. Please email us directly.',
        fallbackEmail: siteConfig.email,
      },
      { status: 500 },
    );
  }
}
