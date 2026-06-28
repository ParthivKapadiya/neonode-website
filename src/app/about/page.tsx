import { createMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui/PageHero';
import { FadeIn } from '@/components/animations/FadeIn';
import { CTASection } from '@/components/sections/CTASection';
import { Statistics } from '@/components/sections/Statistics';
import { brandStory, aboutPageContent } from '@/data/about';
import { whyChooseUs } from '@/data/content';
import { getIcon } from '@/lib/icons';

export const metadata = createMetadata({
  title: 'About Us',
  description:
    'NeoNode Web Solution — Rajkot-based web development team building fast, conversion-focused websites and custom applications for businesses in Gujarat and worldwide.',
  path: '/about',
  keywords: [
    'web development company Rajkot',
    'NeoNode about',
    'website developer Gujarat',
    'Next.js agency India',
  ],
});

const whyChooseWithIcons = whyChooseUs.map((item) => ({
  ...item,
  Icon: getIcon(item.icon),
}));

function WhyChooseCard({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: ReturnType<typeof getIcon>;
}) {
  return (
    <div className="flex gap-5 rounded-2xl border border-border bg-card/50 p-6 md:p-8">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div>
        <h3 className="mb-2 font-semibold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About NeoNode"
        title={aboutPageContent.headline}
        description={aboutPageContent.subheadline}
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <h2 className="section-title">Our story</h2>
              <div className="mt-6 space-y-4 leading-relaxed text-muted">
                {aboutPageContent.story.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="space-y-6">
                <div className="card-base p-6 md:p-8">
                  <h3 className="mb-2 text-xs font-semibold tracking-widest text-primary uppercase">
                    Mission
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{brandStory.mission}</p>
                </div>
                <div className="card-base p-6 md:p-8">
                  <h3 className="mb-2 text-xs font-semibold tracking-widest text-secondary uppercase">
                    Vision
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{brandStory.vision}</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <Statistics />

      <section className="section-padding bg-surface/30">
        <div className="container-custom">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="section-title">Our values</h2>
            <p className="section-lead mx-auto mt-4">What guides every project we take on.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {brandStory.values.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.08}>
                <div className="card-base h-full p-6 md:p-8">
                  <h3 className="mb-3 font-semibold text-white">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="section-title">Our approach</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {brandStory.approach.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="card-base h-full p-6 md:p-8">
                  <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface/30">
        <div className="container-custom">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="section-title">Why businesses trust NeoNode</h2>
          </div>
          <ul className="mx-auto grid max-w-3xl gap-3">
            {brandStory.trustPoints.map((point, i) => (
              <FadeIn key={point} delay={i * 0.06}>
                <li className="flex items-start gap-3 rounded-xl border border-border bg-card/40 px-5 py-4 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {point}
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="section-title">What sets us apart</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {whyChooseWithIcons.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <WhyChooseCard title={item.title} description={item.description} Icon={item.Icon} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
