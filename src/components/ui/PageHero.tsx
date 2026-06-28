import { PageHeroGradient } from '@/components/animations/FloatingGradient';

interface PageHeroProps {
  label?: string;
  title: string;
  description?: string;
}

export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 md:pt-36 md:pb-16">
      <PageHeroGradient />
      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {label && <span className="section-label">{label}</span>}
          <h1 className="section-title">{title}</h1>
          {description && <p className="section-lead mx-auto mt-4">{description}</p>}
        </div>
      </div>
    </section>
  );
}
