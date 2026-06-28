import { createMetadata } from '@/lib/metadata';
import { ContactForm } from '@/components/sections/ContactForm';

export const metadata = createMetadata({
  title: 'Contact',
  description:
    'Schedule a free web development consultation with NeoNode Web Solution. Based in Rajkot, Gujarat — serving businesses across India and worldwide. Response within 24 hours.',
  path: '/contact',
  keywords: [
    'web development consultation Rajkot',
    'website quote Gujarat',
    'hire web developer India',
    'NeoNode contact',
  ],
});

export default function ContactPage() {
  return (
    <>
      <div className="pt-16 md:pt-20" />
      <ContactForm />
    </>
  );
}
