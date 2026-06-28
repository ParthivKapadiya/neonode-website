import { Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center section-padding">
      <div className="container-custom text-center">
        <p className="text-8xl font-bold gradient-text md:text-9xl">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white md:text-3xl">Page Not Found</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The page you are looking for does not exist or may have been moved. Head back to the
          homepage or schedule a free consultation — we will help you find what you need.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/" size="lg">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Schedule Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
