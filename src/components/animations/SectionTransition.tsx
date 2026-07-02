'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fadeUpVariants, defaultTransition, VIEWPORT_DEFAULT, VIEWPORT_SECTION } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface SectionTransitionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  parallax?: boolean;
}

export function SectionTransition({ children, id, className, parallax }: SectionTransitionProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={cn('relative', className)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_SECTION}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.45, ease: defaultTransition.ease },
        },
      }}
    >
      {parallax && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-[80px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT_SECTION}
            transition={{ duration: 1 }}
          />
        </div>
      )}
      {children}
    </motion.section>
  );
}

interface SectionRevealProps {
  label?: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionReveal({
  label,
  title,
  description,
  align = 'center',
  className,
}: SectionRevealProps) {
  const reduced = useReducedMotion();

  const content = (
    <>
      {label && (
        <motion.span
          variants={fadeUpVariants}
          transition={defaultTransition}
          className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-primary uppercase"
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUpVariants}
        transition={{ ...defaultTransition, delay: 0.05 }}
        className="section-title"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUpVariants}
          transition={{ ...defaultTransition, delay: 0.1 }}
          className="section-lead mt-4"
        >
          {description}
        </motion.p>
      )}
    </>
  );

  if (reduced) {
    return (
      <div
        className={cn(
          'mb-12 md:mb-16',
          align === 'center' && 'mx-auto max-w-3xl text-center',
          className,
        )}
      >
        {content}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'mx-auto max-w-3xl text-center',
        align === 'left' && 'max-w-2xl text-left',
        className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_SECTION}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {content}
    </motion.div>
  );
}
