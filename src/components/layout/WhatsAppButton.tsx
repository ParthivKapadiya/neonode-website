'use client';

import { motion } from 'framer-motion';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function WhatsAppButton() {
  const reduced = useReducedMotion();
  const whatsappUrl = getWhatsAppUrl('Hello! I am interested in a web development project with NeoNode.');

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 md:bottom-6 md:right-6"
      initial={reduced ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.35 }}
      whileHover={reduced ? undefined : { scale: 1.06 }}
      whileTap={reduced ? undefined : { scale: 0.96 }}
      aria-label="Contact NeoNode on WhatsApp"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </motion.a>
  );
}
