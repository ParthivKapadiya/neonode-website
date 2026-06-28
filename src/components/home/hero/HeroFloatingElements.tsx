'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const codeLines = [
  { tokens: [{ t: 'const', c: 'text-purple-400' }, { t: ' app', c: 'text-white' }, { t: ' =', c: 'text-muted' }] },
  { tokens: [{ t: '  await', c: 'text-purple-400' }, { t: ' createWebsite', c: 'text-cyan-400' }, { t: '({', c: 'text-white' }] },
  { tokens: [{ t: '    performance:', c: 'text-blue-300' }, { t: " '99+'", c: 'text-emerald-400' }, { t: ',', c: 'text-white' }] },
  { tokens: [{ t: '    design:', c: 'text-blue-300' }, { t: " 'premium'", c: 'text-emerald-400' }, { t: ',', c: 'text-white' }] },
  { tokens: [{ t: '    seo:', c: 'text-blue-300' }, { t: ' true', c: 'text-amber-400' }] },
  { tokens: [{ t: '  })', c: 'text-white' }] },
];

export function HeroCodeSnippet() {
  const reduced = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState(reduced ? codeLines.length : 0);

  useEffect(() => {
    if (reduced) return;
    let line = 0;
    const interval = setInterval(() => {
      line += 1;
      setVisibleLines(line);
      if (line >= codeLines.length) clearInterval(interval);
    }, 400);
    return () => clearInterval(interval);
  }, [reduced]);

  return (
    <motion.div
      className="absolute -top-4 -left-8 z-20 hidden w-56 rounded-xl border border-white/10 bg-[#0d0d0f]/90 p-4 font-mono text-[10px] shadow-2xl backdrop-blur-xl md:block lg:-left-12 lg:w-64 lg:text-[11px]"
      initial={{ opacity: 0, x: -20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
      transition={{
        opacity: { delay: 1, duration: 0.5 },
        x: { delay: 1, duration: 0.5 },
        y: { delay: 1.5, duration: 5, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-red-500/70" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/70" />
          <div className="h-2 w-2 rounded-full bg-green-500/70" />
        </div>
        <span className="text-[9px] text-muted">deploy.tsx</span>
      </div>
      <div className="space-y-1">
        {codeLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={i < visibleLines ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.3 }}
            className="leading-relaxed"
          >
            {line.tokens.map((token, j) => (
              <span key={j} className={token.c}>
                {token.t}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
      <motion.span
        className="mt-1 inline-block h-3 w-1.5 bg-primary"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.div>
  );
}

export function HeroFloatingCards() {
  const cards = [
    {
      className: 'absolute -right-6 top-8 z-20 lg:-right-10',
      delay: 1.2,
      content: (
        <>
          <p className="text-2xl font-bold gradient-text">95+</p>
          <p className="text-[10px] text-muted">Lighthouse Score</p>
        </>
      ),
    },
    {
      className: 'absolute -bottom-4 -left-4 z-20 lg:-bottom-8 lg:-left-10',
      delay: 1.4,
      content: (
        <>
          <div className="mb-1 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-medium text-emerald-400">Live</span>
          </div>
          <p className="text-xs font-semibold text-white">Mobile Optimized</p>
        </>
      ),
    },
    {
      className: 'absolute top-1/2 -right-12 z-20 hidden xl:block',
      delay: 1.6,
      content: (
        <>
          <p className="text-[10px] text-muted">Page load</p>
          <p className="text-sm font-bold text-white">&lt; 1.2s</p>
        </>
      ),
    },
    {
      className: 'absolute -top-6 right-1/4 z-20 hidden lg:block',
      delay: 1.8,
      content: (
        <>
          <p className="mb-2 text-[10px] font-medium text-muted uppercase tracking-wider">
            Analytics
          </p>
          <div className="flex items-end gap-1">
            {[40, 65, 45, 80, 60, 95].map((h, i) => (
              <div
                key={i}
                className="w-2 rounded-sm bg-gradient-to-t from-primary to-secondary"
                style={{ height: `${h * 0.35}px` }}
              />
            ))}
          </div>
          <p className="mt-2 text-xs font-semibold text-emerald-400">+127% traffic</p>
        </>
      ),
    },
  ];

  return (
    <>
      <HeroCodeSnippet />
      {cards.map((card, i) => (
        <motion.div
          key={i}
          className={`rounded-2xl border border-white/10 bg-card/90 px-4 py-3 shadow-xl backdrop-blur-xl ${card.className}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, i % 2 === 0 ? -8 : 8, 0] }}
          transition={{
            opacity: { delay: card.delay, duration: 0.5 },
            scale: { delay: card.delay, duration: 0.5 },
            y: { delay: card.delay + 0.5, duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {card.content}
        </motion.div>
      ))}
    </>
  );
}
