import { siteConfig } from '@/config/site';

export async function sendContactWhatsApp(message: string): Promise<boolean> {
  const apiKey = process.env.CALLMEBOT_API_KEY;
  const phone = process.env.WHATSAPP_NOTIFY_PHONE || siteConfig.whatsapp;

  if (!apiKey) return false;

  const url = new URL('https://api.callmebot.com/whatsapp.php');
  url.searchParams.set('phone', phone);
  url.searchParams.set('text', message);
  url.searchParams.set('apikey', apiKey);

  try {
    const response = await fetch(url.toString(), { method: 'GET' });

    if (!response.ok) {
      console.error('WhatsApp notification failed:', await response.text());
      return false;
    }

    const body = await response.text();
    if (body.toLowerCase().includes('error')) {
      console.error('CallMeBot error:', body);
      return false;
    }

    return true;
  } catch (error) {
    console.error('WhatsApp notification error:', error);
    return false;
  }
}

export function isWhatsAppConfigured(): boolean {
  return Boolean(process.env.CALLMEBOT_API_KEY);
}
