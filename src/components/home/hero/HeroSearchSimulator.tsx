'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { Globe, Search, TrendingUp } from 'lucide-react';
import { defaultTransition, EASE_OUT } from '@/lib/motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SEARCH_QUERIES, SEARCH_RESULT } from './copy';
import { cn } from '@/lib/utils';

const TYPE_MS = 55;
const HOLD_MS = 2200;
const DELETE_MS = 28;

function useTypewriterCycle(queries: readonly string[], reduced: boolean) {
  const [queryIndex, setQueryIndex] = useState(0);
  const [text, setText] = useState(reduced ? queries[0] : '');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) {
      setText(queries[0]);
      return;
    }

    const full = queries[queryIndex];

    if (!deleting && text === full) {
      const hold = setTimeout(() => setDeleting(true), HOLD_MS);
      return () => clearTimeout(hold);
    }

    if (deleting && text === '') {
      setDeleting(false);
      setQueryIndex((i) => (i + 1) % queries.length);
      return;
    }

    const timeout = setTimeout(
      () => setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
      deleting ? DELETE_MS : TYPE_MS,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, queryIndex, queries, reduced]);

  return text;
}

function FakeResult({
  rank,
  url,
  title,
  description,
  tags,
  featured = false,
}: {
  rank: number;
  url: string;
  title: string;
  description: string;
  tags?: readonly string[];
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border px-3.5 py-3 sm:px-4 sm:py-3.5',
        featured
          ? 'border-primary/30 bg-primary/[0.06] shadow-lg shadow-primary/10'
          : 'border-transparent bg-white/[0.02] opacity-50',
      )}
    >
      <div className="mb-1 flex items-center gap-2">
        <span className="font-mono text-[9px] text-muted sm:text-[10px]">#{rank}</span>
        <span
          className={cn(
            'truncate font-mono text-[10px] sm:text-[11px]',
            featured ? 'text-emerald-400/90' : 'text-muted',
          )}
        >
          {url}
        </span>
        {featured && (
          <span className="ml-auto flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[8px] font-semibold text-emerald-400 sm:text-[9px]">
            <TrendingUp className="h-2.5 w-2.5" />
            Top result
          </span>
        )}
      </div>
      <p className={cn('text-sm font-medium sm:text-[0.9375rem]', featured ? 'text-primary' : 'text-white/70')}>
        {title}
      </p>
      <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted sm:text-xs">{description}</p>
      {tags && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/6 bg-white/[0.03] px-1.5 py-0.5 text-[8px] font-medium text-muted sm:text-[9px]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function HeroSearchSimulator() {
  const reduced = useReducedMotion();
  const typedQuery = useTypewriterCycle(SEARCH_QUERIES, reduced);
  const { x, y } = useMousePosition();
  const [resultsVisible, setResultsVisible] = useState(reduced);

  const rotateX = useSpring(0, { stiffness: 55, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 55, damping: 22 });

  useEffect(() => {
    if (reduced) return;
    rotateX.set((y - 0.5) * -2);
    rotateY.set((x - 0.5) * 4);
  }, [x, y, rotateX, rotateY, reduced]);

  useEffect(() => {
    if (reduced) return;
    setResultsVisible(typedQuery.length > 4);
  }, [typedQuery, reduced]);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-xl lg:max-w-none"
      initial={reduced ? false : { opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...defaultTransition, delay: reduced ? 0 : 0.35, ease: EASE_OUT }}
    >
      <div className="absolute -inset-8 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_65%)]" />

      <motion.div style={{ perspective: 1200, rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#080a0f] shadow-2xl shadow-black/50">
          <div className="flex items-center gap-2 border-b border-white/5 bg-[#050608] px-4 py-2.5">
            <Globe className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
            <span className="text-[10px] font-medium tracking-wide text-muted uppercase">Search preview</span>
            <span className="ml-auto font-mono text-[9px] text-white/30">live simulation</span>
          </div>

          <div className="space-y-4 p-4 sm:p-5">
            <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 shadow-inner">
              <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
              <div className="min-w-0 flex-1 font-mono text-sm text-white sm:text-[0.9375rem]">
                {typedQuery}
                {!reduced && (
                  <motion.span
                    className="ml-0.5 inline-block h-[1.1em] w-0.5 bg-primary"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </div>
            </div>

            <AnimatePresence>
              {resultsVisible && (
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="space-y-2"
                >
                  <p className="text-[10px] text-muted">
                    About <span className="text-white/50">847,000</span> results · 0.42 seconds
                  </p>

                  <FakeResult
                    rank={1}
                    url={SEARCH_RESULT.url}
                    title={SEARCH_RESULT.title}
                    description={SEARCH_RESULT.description}
                    tags={SEARCH_RESULT.tags}
                    featured
                  />

                  <FakeResult
                    rank={2}
                    url="competitor-site.com"
                    title="Generic Competitor — Slow, outdated layout"
                    description="An older website that loads slowly and isn't optimized for mobile search traffic."
                  />

                  <FakeResult
                    rank={3}
                    url="another-listing.com"
                    title="Directory Listing — Not your brand"
                    description="Third-party listing you don't control. Customers may never reach your business."
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-t border-white/5 bg-[#050608]/90 px-4 py-2.5">
            <p className="text-center text-[10px] text-muted">
              This is what ranking on Google looks like —{' '}
              <span className="font-medium text-primary">position #1</span>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
