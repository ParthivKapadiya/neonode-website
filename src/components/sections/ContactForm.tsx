'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Mail, MapPin, Phone, Send, Shield } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { budgetOptions } from '@/data/content';
import { industryOptions, timelineOptions } from '@/data/home';
import { serviceOptions } from '@/data/services';
import { contactFormSchema, type ContactFormValues } from '@/schema/contact';
import { submitContactInquiry } from '@/lib/contact/submit-contact';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FadeIn } from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';
import { InstagramFollow } from '@/components/shared/InstagramFollow';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

    const result = await submitContactInquiry(data);

    if (!result.success) {
      setSubmitError(result.error);
      return;
    }

    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 8000);
  };

  return (
    <section id="contact" className="section-padding bg-surface/30">
      <div className="container-custom">
        <SectionHeader
          label="Contact"
          title="Schedule Your"
          highlight="Free Consultation"
          description="Share your project details below. We respond within 24 hours with a clear plan, timeline, and quote. Or reach us directly via WhatsApp or email."
        />

        <div className="grid gap-12 lg:grid-cols-5">
          <FadeIn className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-xl font-semibold text-white">Get in Touch</h3>
                <p className="text-sm leading-relaxed text-muted">
                  Whether you have a detailed brief or just an idea, we are here to help. Reach
                  out via form, email, or WhatsApp.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 transition-colors hover:border-primary/30"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Email</p>
                    <p className="text-sm font-medium text-white">{siteConfig.email}</p>
                  </div>
                </a>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 transition-colors hover:border-primary/30"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Phone</p>
                    <p className="text-sm font-medium text-white">{siteConfig.phone}</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Location</p>
                    <p className="text-sm font-medium text-white">
                      {siteConfig.address.city}, {siteConfig.address.state}
                    </p>
                  </div>
                </div>
              </div>

              <InstagramFollow className="mt-6" compact />
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="lg:col-span-3">
            <div className="relative rounded-2xl border border-border bg-card/50 p-8">
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-card/95 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle className="h-16 w-16 text-emerald-400" />
                    </motion.div>
                    <h3 className="mt-4 text-xl font-semibold text-white">Inquiry Received!</h3>
                    <p className="mt-2 text-sm text-muted">
                      We will get back to you within 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Your Name *"
                    placeholder="John Smith"
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
                    placeholder="Your Company"
                    error={errors.company?.message}
                    {...register('company')}
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Select
                    label="Industry *"
                    options={[{ value: '', label: 'Select industry' }, ...industryOptions]}
                    error={errors.industry?.message}
                    {...register('industry')}
                  />
                  <Select
                    label="Timeline *"
                    options={[{ value: '', label: 'Select timeline' }, ...timelineOptions]}
                    error={errors.timeline?.message}
                    {...register('timeline')}
                  />
                </div>
                <Select
                  label="Budget Range *"
                  options={[{ value: '', label: 'Select budget' }, ...budgetOptions]}
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
                        {serviceOptions.slice(0, 6).map((opt) => (
                          <label
                            key={opt.value}
                            className={cn(
                              'flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-xs transition-all',
                              field.value?.includes(opt.value)
                                ? 'border-primary/50 bg-primary/10 text-white'
                                : 'border-border bg-surface/50 text-muted',
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
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    )}
                  />
                  {errors.services?.message && (
                    <p className="text-sm text-red-400">{errors.services.message}</p>
                  )}
                </div>
                <Textarea
                  label="Project Description *"
                  placeholder="Describe your project, goals, and any reference sites..."
                  rows={5}
                  error={errors.message?.message}
                  {...register('message')}
                />
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : (
                      <>
                        Send Inquiry
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <p className="flex items-center gap-2 text-xs text-muted">
                    <Shield className="h-3.5 w-3.5 text-emerald-400" />
                    Your information stays private
                  </p>
                </div>
                {submitError && (
                  <p className="text-sm text-red-400" role="alert">
                    {submitError}{' '}
                    <a href={siteConfig.whatsappUrl} className="underline hover:text-red-300">
                      WhatsApp
                    </a>{' '}
                    or{' '}
                    <a href={`mailto:${siteConfig.email}`} className="underline hover:text-red-300">
                      email
                    </a>
                    .
                  </p>
                )}
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
