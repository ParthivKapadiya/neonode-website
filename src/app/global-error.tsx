'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[#050505] p-6 text-white antialiased">
        <div className="max-w-md text-center">
          <p className="text-6xl font-bold text-primary">!</p>
          <h1 className="mt-4 text-2xl font-bold">Something went wrong</h1>
          <p className="mt-3 text-sm text-white/60">
            An unexpected error occurred. Please try again or contact us directly.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={() => reset()} size="lg">
              Try again
            </Button>
            <Button href="/" variant="outline" size="lg">
              Back to Home
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
