import { createMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui/PageHero';
import { FadeIn } from '@/components/animations/FadeIn';

export const metadata = createMetadata({
  title: 'Privacy Policy',
  description: 'Privacy Policy for NeoNode Web Solution — how we collect, use, and protect your data.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Privacy Policy"
        description="Last updated: June 1, 2025"
      />

      <section className="section-padding !pt-8">
        <div className="container-custom max-w-3xl">
          <FadeIn>
            <div className="space-y-8 text-muted leading-relaxed">
              <div>
                <h2 className="mb-3 text-xl font-semibold text-white">Introduction</h2>
                <p>
                  NeoNode Web Solution (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
                  committed to protecting your privacy. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information when you visit our
                  website or use our services.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-semibold text-white">Information We Collect</h2>
                <p className="mb-3">We may collect the following types of information:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Personal information you provide (name, email, phone number, company name)
                  </li>
                  <li>Project details and communication preferences</li>
                  <li>Technical data (IP address, browser type, device information)</li>
                  <li>Usage data (pages visited, time spent, referral sources)</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-semibold text-white">How We Use Your Information</h2>
                <ul className="list-disc space-y-2 pl-6">
                  <li>To respond to inquiries and provide our services</li>
                  <li>To improve our website and user experience</li>
                  <li>To send relevant communications (with your consent)</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-semibold text-white">Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your
                  personal information against unauthorized access, alteration, disclosure, or
                  destruction.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-semibold text-white">Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us at{' '}
                  <a href="mailto:contact.neonode@gmail.com" className="text-primary hover:underline">
                    contact.neonode@gmail.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
