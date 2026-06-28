'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { AnimatedLogo } from '@/components/home/shared/AnimatedLogo';

const lines: { words: string[]; gradientFrom?: number }[] = [
  { words: ['We', 'Build'] },
  { words: ['Websites', 'That'], gradientFrom: 0 },
  { words: ['Win', 'Clients'], gradientFrom: 0 },
];

const WORD_DELAY = 0.07;
const START_DELAY = 0.15;

function buildDelays() {
  const delays: { word: string; gradient: boolean; delay: number }[] = [];
  let t = START_DELAY;

  lines.forEach((line) => {
    line.words.forEach((word, wi) => {
      const gradient =
        line.gradientFrom !== undefined ? wi >= line.gradientFrom : false;
      delays.push({ word, gradient, delay: t });
      t += WORD_DELAY;
    });
  });

  return { delays, subheadDelay: t + 0.1 };
}

const { delays, subheadDelay } = buildDelays();

const lineGroups = lines.map((line, li) => {
  const offset = lines.slice(0, li).reduce((acc, l) => acc + l.words.length, 0);
  return delays.slice(offset, offset + line.words.length);
});

export function HeroHeadline() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/5 py-2 pr-5 pl-2 shadow-lg shadow-primary/5 backdrop-blur-md"
      >
        <AnimatedLogo size={36} glow={false} />
        <span className="flex items-center gap-2 text-sm font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Premium Web Development Agency
        </span>
      </motion.div>

      <h1
        className="text-[2rem] leading-[1.08] font-bold tracking-tight min-[375px]:text-[2.25rem] sm:text-5xl md:text-6xl xl:text-[4.25rem]"
        style={{ perspective: 800 }}
      >
        {lineGroups.map((group, li) => (
          <span key={li} className="block">
            {group.map(({ word, gradient, delay }) => (
              <motion.span
                key={`${word}-${delay}`}
                className={`mr-[0.28em] inline-block ${gradient ? 'gradient-text' : 'text-white'}`}
                initial={{ opacity: 0, y: 40, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay,
                  duration: 0.65,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        ))}
      </h1>

      <motion.p
        className="mt-7 max-w-lg text-base leading-relaxed text-muted sm:text-lg md:text-xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: subheadDelay, duration: 0.7 }}
      >
        NeoNode Web Solution builds fast, search-optimized websites for clinics, businesses, and
        startups — from Rajkot to worldwide. Your next customer is already searching. We make sure
        they find you.
      </motion.p>
    </div>
  );
}
