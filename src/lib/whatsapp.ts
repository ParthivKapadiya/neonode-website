import { siteConfig } from '@/config/site';

export function getWhatsAppUrl(message?: string) {
  if (!message) return siteConfig.whatsappUrl;
  return `${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`;
}
