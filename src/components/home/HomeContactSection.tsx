'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, Mail, Send, Shield } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { siteConfig } from '@/config/site';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { budgetOptions } from '@/data/content';
import { industryOptions, timelineOptions } from '@/data/home';
import { serviceOptions } from '@/data/services';
import { contactFormSchema, type ContactFormValues } from '@/schema/contact';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { InstagramFollow } from '@/components/shared/InstagramFollow';
import {
  SectionTransition,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  HoverLift,
} from '@/components/animations';

export function HomeContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const whatsappUrl = getWhatsAppUrl('Hello! I am interested in a web development project with NeoNode.');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      services: [],
      industry: '',
      budget: '',
      timeline: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmitError(result.error || 'Failed to send message');
        return;
      }

      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 8000);
    } catch {
      setSubmitError('Network error. Please try again or contact us on WhatsApp.');
    }
  };

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: WhatsAppIcon,
      label: 'Phone / WhatsApp',
      value: siteConfig.phone,
      href: whatsappUrl,
      iconClassName: 'text-[#25D366]',
    },
    {
      icon: Clock,
      label: 'Response time',
      value: siteConfig.businessHours.response,
      href: undefined,
    },
  ];

  return (
    <SectionTransition id="contact" className="section-padding overflow-hidden bg-surface/30">
      <div className="container-custom">
        <div className="mb-12 max-w-2xl">
          <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-primary uppercase">
            Start Your Project
          </span>
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Schedule your{' '}
            <span className="gradient-text">free consultation</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Tell us about your business and goals. We will respond within 24 hours with a clear
            plan, timeline, and fixed quote — no pressure, no obligations. Prefer WhatsApp? Message
            us at {siteConfig.phone}.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <FadeIn direction="left" className="lg:col-span-2">
            <StaggerContainer className="space-y-4" staggerDelay={0.08}>
              {contactItems.map((item) => (
                <StaggerItem key={item.label}>
                  <HoverLift intensity="subtle">
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-5 transition-colors hover:border-primary/30"
                      >
                        <ContactCardContent {...item} />
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-5">
                        <ContactCardContent {...item} />
                      </div>
                    )}
                  </HoverLift>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <Shield className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <div>
                <p className="text-sm font-medium text-white">Your information is safe</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  We never share your details with third parties. Your inquiry goes directly to our
                  development team in Rajkot.
                </p>
              </div>
            </div>

            <InstagramFollow className="mt-6" />
          </FadeIn>

          <FadeIn delay={0.15} className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 md:p-8">
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-card/95 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      <CheckCircle className="h-20 w-20 text-emerald-400" />
                    </motion.div>
                    <motion.h3
                      className="mt-6 text-2xl font-bold text-white"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Inquiry received!
                    </motion.h3>
                    <motion.p
                      className="mt-2 max-w-xs text-center text-sm text-muted"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      We will review your project details and respond within 24 hours with next
                      steps.
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Your Name *"
                    placeholder="Dr. Hiren Patel"
                    error={errors.name?.message}
                    {...register('name')}
                  />
                  <Input
                    label="Email Address *"
                    type="email"
                    placeholder="you@business.com"
                    error={errors.email?.message}
                    {...register('email')}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Phone / WhatsApp"
                    type="tel"
                    placeholder="+91 98765 43210"
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                  <Input
                    label="Business Name *"
                    placeholder="Patel Family Clinic"
                    error={errors.company?.message}
                    {...register('company')}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Select
                    label="Industry *"
                    options={[{ value: '', label: 'Select your industry' }, ...industryOptions]}
                    error={errors.industry?.message}
                    {...register('industry')}
                  />
                  <Select
                    label="Timeline *"
                    options={[{ value: '', label: 'When do you need this?' }, ...timelineOptions]}
                    error={errors.timeline?.message}
                    {...register('timeline')}
                  />
                </div>

                <Select
                  label="Budget Range *"
                  options={[{ value: '', label: 'Select budget range' }, ...budgetOptions]}
                  error={errors.budget?.message}
                  {...register('budget')}
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white/80">
                    Services Interested In *
                  </label>
                  <Controller
                    name="services"
                    control={control}
                    render={({ field }) => (
                      <div className="grid gap-2 sm:grid-cols-2">
                        {serviceOptions.map((opt) => (
                          <label
                            key={opt.value}
                            className={cn(
                              'flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all',
                              field.value?.includes(opt.value)
                                ? 'border-primary/50 bg-primary/10 text-white'
                                : 'border-border bg-surface/50 text-muted hover:border-white/15',
                            )}
                          >
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={field.value?.includes(opt.value)}
                              onChange={(e) => {
                                const next = e.target.checked
                                  ? [...(field.value ?? []), opt.value]
                                  : (field.value ?? []).filter((v) => v !== opt.value);
                                field.onChange(next);
                              }}
                            />
                            <span
                              className={cn(
                                'flex h-4 w-4 shrink-0 items-center justify-center rounded border',
                                field.value?.includes(opt.value)
                                  ? 'border-primary bg-primary'
                                  : 'border-white/20',
                              )}
                            >
                              {field.value?.includes(opt.value) && (
                                <CheckCircle className="h-3 w-3 text-white" />
                              )}
                            </span>
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    )}
                  />
                  {errors.services?.message && (
                    <p className="text-sm text-red-400" role="alert">
                      {errors.services.message}
                    </p>
                  )}
                </div>

                <Textarea
                  label="Project Description *"
                  placeholder="Describe your business, goals, pages needed, and any inspiration or reference sites..."
                  rows={5}
                  error={errors.message?.message}
                  {...register('message')}
                />

                <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Project Inquiry
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>

                {submitError && (
                  <p className="text-sm text-red-400" role="alert">
                    {submitError}{' '}
                    <a href={whatsappUrl} className="underline hover:text-red-300">
                      WhatsApp us
                    </a>{' '}
                    or email{' '}
                    <a href={`mailto:${siteConfig.email}`} className="underline hover:text-red-300">
                      {siteConfig.email}
                    </a>
                    .
                  </p>
                )}
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </SectionTransition>
  );
}

function ContactCardContent({
  icon: Icon,
  label,
  value,
  iconClassName,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  iconClassName?: string;
}) {
  return (
    <>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Icon className={cn('h-5 w-5', iconClassName)} />
      </div>
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="font-medium text-white">{value}</p>
      </div>
    </>
  );
}
