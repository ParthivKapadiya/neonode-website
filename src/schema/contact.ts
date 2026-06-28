import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[\d\s\-+()]{7,20}$/.test(val), {
      message: 'Please enter a valid phone number',
    }),
  company: z.string().min(1, 'Business name is required'),
  industry: z.string().min(1, 'Please select your industry'),
  services: z
    .array(z.string())
    .min(1, 'Select at least one service you are interested in'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  message: z
    .string()
    .min(20, 'Please describe your project in at least 20 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
