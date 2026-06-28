import { createMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui/PageHero';
import { FadeIn } from '@/components/animations/FadeIn';

export const metadata = createMetadata({
  title: 'Terms of Service',
  description: 'Terms of Service for NeoNode Web Solution web development services.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Terms of Service"
        description="Last updated: June 1, 2025"
      />

      <section className="section-padding !pt-8">
        <div className="container-custom max-w-3xl">
          <FadeIn>
            <div className="space-y-8 text-muted leading-relaxed">
              <div>
                <h2 className="mb-3 text-xl font-semibold text-white">Agreement to Terms</h2>
                <p>
                  By accessing or using the services of NeoNode Web Solution, you agree to be
                  bound by these Terms of Service. If you do not agree with any part of these
                  terms, you may not use our services.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-semibold text-white">Services</h2>
                <p>
                  NeoNode Web Solution provides web design, web development, and related digital
                  services. The specific scope, deliverables, timeline, and pricing for each
                  project will be outlined in a separate project agreement or statement of work.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-semibold text-white">Payment Terms</h2>
                <ul className="list-disc space-y-2 pl-6">
                  <li>A deposit is required before work begins on any project</li>
                  <li>Payment milestones are defined in the project agreement</li>
                  <li>Final deliverables are released upon receipt of final payment</li>
                  <li>Late payments may incur additional fees as specified in the agreement</li>
                </ul>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-semibold text-white">Intellectual Property</h2>
                <p>
                  Upon full payment, clients receive ownership of custom designs and code created
                  specifically for their project. NeoNode Web Solution retains the right to
                  showcase completed work in our portfolio unless otherwise agreed in writing.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-semibold text-white">Limitation of Liability</h2>
                <p>
                  NeoNode Web Solution shall not be liable for any indirect, incidental, special,
                  or consequential damages arising from the use of our services. Our total
                  liability shall not exceed the amount paid for the specific project in question.
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-semibold text-white">Contact</h2>
                <p>
                  For questions about these Terms, contact us at{' '}
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
