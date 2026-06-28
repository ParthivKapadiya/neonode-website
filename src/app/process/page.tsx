import { createMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui/PageHero';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CTASection } from '@/components/sections/CTASection';
import { FadeIn } from '@/components/animations/FadeIn';
import { processSteps } from '@/data/content';

export const metadata = createMetadata({
  title: 'Our Process',
  description:
    'Discover our proven five-phase web development process — from discovery and strategy to design, development, and launch.',
  path: '/process',
});

const principles = [
  {
    title: 'Collaborative Approach',
    description:
      'You are involved at every stage. Regular check-ins, shared dashboards, and open communication ensure your vision stays at the center.',
  },
  {
    title: 'Agile Methodology',
    description:
      'We work in sprints with incremental deliverables, allowing for flexibility and continuous improvement throughout the project.',
  },
  {
    title: 'Quality Assurance',
    description:
      'Rigorous testing across devices, browsers, and performance benchmarks ensures your website launches flawlessly.',
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        label="Process"
        title="How We Work"
        description="A transparent, proven workflow that transforms your vision into a high-performing digital product — on time and on budget."
      />

      <section className="section-padding !pb-0">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-3">
            {principles.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="rounded-2xl border border-border bg-card/50 p-8">
                  <h3 className="mb-3 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />

      <section className="section-padding">
        <div className="container-custom">
          <FadeIn>
            <div className="rounded-3xl border border-border bg-card/50 p-8 md:p-12">
              <h2 className="mb-8 text-2xl font-bold text-white">Typical Timeline</h2>
              <div className="space-y-4">
                {processSteps.map((step) => (
                  <div
                    key={step.step}
                    className="flex items-center justify-between rounded-xl bg-white/5 px-6 py-4"
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                        {step.step}
                      </span>
                      <span className="font-medium text-white">{step.title}</span>
                    </div>
                    <span className="text-sm text-muted">{step.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </>
  );
}
