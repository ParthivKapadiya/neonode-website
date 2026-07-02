'use client';

import { motion } from 'framer-motion';
import { Box, Layout, Palette, Rocket, Sparkles, Zap } from 'lucide-react';
import { EASE_OUT } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';
import { slotStyle, type SlotKey } from './constants';

function Slot({
  slot,
  className,
  children,
}: {
  slot: SlotKey;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn('absolute', className)} style={slotStyle(slot)}>
      {children}
    </div>
  );
}

function BlueprintAnnotations() {
  const labels: { slot: SlotKey; label: string; dim: string }[] = [
    { slot: 'nav', label: 'NAV', dim: '90×8' },
    { slot: 'hero', label: 'HERO', dim: '58×30' },
    { slot: 'card1', label: 'FEATURES', dim: '28×24' },
    { slot: 'cta', label: 'CTA', dim: '32×7' },
  ];

  return (
    <>
      {labels.map(({ slot, label, dim }, i) => (
        <Slot key={label} slot={slot}>
          <motion.div
            className="absolute -top-3 left-0 font-mono text-[7px] tracking-widest text-cyan-400/90 sm:text-[8px]"
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: EASE_OUT }}
          >
            {label}
          </motion.div>
          <motion.div
            className="h-full w-full rounded-sm border border-dashed border-cyan-400/55 bg-cyan-400/[0.03]"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06, duration: 0.45, ease: EASE_OUT }}
          />
          <span className="absolute -right-1 -bottom-3 font-mono text-[6px] text-cyan-400/40 sm:text-[7px]">
            {dim}
          </span>
        </Slot>
      ))}

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M 8 14 L 63 14"
          fill="none"
          stroke="rgba(34,211,238,0.25)"
          strokeWidth="0.4"
          strokeDasharray="2 3"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.path
          d="M 63 14 L 63 46"
          fill="none"
          stroke="rgba(34,211,238,0.25)"
          strokeWidth="0.4"
          strokeDasharray="2 3"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />
      </svg>
    </>
  );
}

export function BlueprintLayer() {
  return (
    <div className="absolute inset-0 bg-[#061018]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.07) 1px, transparent 1px),
            linear-gradient(rgba(34,211,238,0.14) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.14) 1px, transparent 1px)
          `,
          backgroundSize: '12px 12px, 12px 12px, 60px 60px, 60px 60px',
        }}
      />
      <div className="absolute top-3 right-3 font-mono text-[7px] tracking-widest text-cyan-500/50 uppercase sm:text-[8px]">
        Grid 12 col
      </div>
      <BlueprintAnnotations />
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded border border-cyan-500/20 bg-cyan-500/5 px-2 py-1">
        <Layout className="h-3 w-3 text-cyan-400/70" />
        <span className="font-mono text-[7px] text-cyan-400/80 sm:text-[8px]">wireframe.fig</span>
      </div>
    </div>
  );
}

const COMPONENTS = [
  { name: 'Header', icon: Layout },
  { name: 'HeroSection', icon: Sparkles },
  { name: 'FeatureGrid', icon: Box },
  { name: 'CTAButton', icon: Zap },
] as const;

export function StructureLayer() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 bg-[#0a0c12]">
      <Slot slot="nav">
        <div className="flex h-full items-center justify-between rounded-md border border-violet-400/25 bg-violet-500/[0.06] px-[6%]">
          <div className="h-[45%] w-[22%] rounded bg-white/12" />
          <div className="flex gap-[5%]">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[35%] w-[14%] rounded bg-white/8" />
            ))}
          </div>
        </div>
      </Slot>

      <Slot slot="hero">
        <div className="h-full rounded-lg border border-violet-400/20 bg-white/[0.03] p-[5%]">
          <div className="h-[18%] w-[70%] rounded bg-white/14" />
          <div className="mt-[6%] h-[10%] w-[50%] rounded bg-white/8" />
          <div className="mt-[10%] h-[16%] w-[32%] rounded-full border border-dashed border-violet-400/40 bg-violet-500/10" />
        </div>
      </Slot>

      <Slot slot="heroAside">
        <div className="h-full rounded-lg border border-dashed border-white/10 bg-white/[0.02]" />
      </Slot>

      {(['card1', 'card2', 'card3'] as const).map((key) => (
        <Slot key={key} slot={key}>
          <div className="h-full rounded-md border border-violet-400/15 bg-white/[0.04] p-[8%]">
            <div className="mb-[10%] h-[28%] w-[28%] rounded-md bg-violet-500/20" />
            <div className="h-[10%] w-full rounded bg-white/12" />
            <div className="mt-[8%] h-[8%] w-[75%] rounded bg-white/6" />
          </div>
        </Slot>
      ))}

      <Slot slot="cta">
        <div className="h-full rounded-full border border-dashed border-violet-400/30 bg-violet-500/10" />
      </Slot>

      <div className="absolute top-[5%] right-[4%] w-[26%] rounded-lg border border-violet-400/20 bg-[#0d0f18]/95 p-2 shadow-xl backdrop-blur-sm">
        <p className="mb-1.5 font-mono text-[6px] tracking-wider text-violet-300/60 uppercase sm:text-[7px]">
          components
        </p>
        <div className="space-y-1">
          {COMPONENTS.map(({ name, icon: Icon }, i) => (
            <motion.div
              key={name}
              className="flex items-center gap-1.5 rounded border border-white/5 bg-white/[0.03] px-1.5 py-1"
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
            >
              <Icon className="h-2.5 w-2.5 text-violet-400/70" />
              <span className="font-mono text-[7px] text-white/70 sm:text-[8px]">&lt;{name} /&gt;</span>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute bottom-3 left-3 rounded border border-white/5 bg-black/50 px-2 py-1 font-mono text-[7px] sm:text-[8px]"
        animate={reduced ? undefined : { opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-emerald-400/90">$ npm run build</span>
        <span className="text-white/30"> → </span>
        <motion.span
          className="text-white/60"
          animate={reduced ? undefined : { opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          compiling modules…
        </motion.span>
      </motion.div>
    </div>
  );
}

const TOKENS = [
  { label: 'Primary', value: '#3B82F6' },
  { label: 'Accent', value: '#7C3AED' },
  { label: 'Surface', value: '#0F1117' },
] as const;

export function StyleLayer() {
  return (
    <div className="absolute inset-0 bg-[#0c1018]">
      <Slot slot="nav">
        <div className="flex h-full items-center justify-between rounded-lg bg-white/[0.04] px-[6%]">
          <div className="h-[50%] w-[24%] rounded-md bg-gradient-to-r from-primary/70 to-secondary/50" />
          <div className="flex gap-[5%]">
            {['Home', 'Work', 'About'].map((t) => (
              <span key={t} className="text-[6px] font-medium text-white/40 sm:text-[7px]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Slot>

      <Slot slot="hero">
        <div className="relative h-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/30 via-secondary/20 to-cyan-500/10">
          <div className="absolute -top-[30%] -right-[20%] h-[80%] w-[55%] rounded-full bg-secondary/25 blur-2xl" />
          <div className="absolute bottom-[22%] left-[7%] h-[14%] w-[55%] rounded-md bg-white/22" />
          <div className="absolute bottom-[8%] left-[7%] h-[9%] w-[30%] rounded-full bg-gradient-to-r from-primary to-secondary" />
        </div>
      </Slot>

      <Slot slot="heroAside">
        <div className="flex h-full flex-col justify-center gap-[8%] rounded-xl border border-white/5 bg-white/[0.02] p-[10%]">
          <div className="h-[12%] w-full rounded bg-white/10" />
          <div className="h-[12%] w-[80%] rounded bg-white/6" />
          <div className="h-[12%] w-[60%] rounded bg-white/6" />
        </div>
      </Slot>

      {(['card1', 'card2', 'card3'] as const).map((key, i) => (
        <Slot key={key} slot={key}>
          <div
            className={cn(
              'h-full rounded-lg border border-white/6 bg-gradient-to-b to-transparent p-[10%]',
              i === 0 && 'from-primary/15',
              i === 1 && 'from-secondary/15',
              i === 2 && 'from-cyan-500/15',
            )}
          >
            <div
              className="mb-[12%] h-[26%] w-[26%] rounded-lg"
              style={{ backgroundColor: `${TOKENS[i % 3].value}44` }}
            />
            <div className="h-[9%] w-full rounded bg-white/14" />
            <div className="mt-[8%] h-[7%] w-[72%] rounded bg-white/7" />
          </div>
        </Slot>
      ))}

      <Slot slot="cta">
        <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/25" />
      </Slot>

      <div className="absolute top-[5%] right-[4%] w-[28%] rounded-lg border border-primary/20 bg-[#0a0e16]/95 p-2 shadow-xl backdrop-blur-sm">
        <div className="mb-2 flex items-center gap-1">
          <Palette className="h-3 w-3 text-primary/70" />
          <span className="text-[7px] font-semibold tracking-wide text-primary/80 uppercase sm:text-[8px]">
            Design tokens
          </span>
        </div>
        <div className="space-y-1.5">
          {TOKENS.map(({ label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border border-white/10" style={{ backgroundColor: value }} />
              <span className="font-mono text-[7px] text-white/50 sm:text-[8px]">{label}</span>
              <span className="ml-auto font-mono text-[6px] text-muted sm:text-[7px]">{value}</span>
            </div>
          ))}
          <div className="mt-1 border-t border-white/5 pt-1.5">
            <span className="text-[10px] font-semibold text-white/80">Aa</span>
            <span className="ml-1.5 text-[7px] text-muted">Inter · 16/24</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LaunchLayer() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 bg-[#080b12]">
      <Slot slot="nav">
        <div className="flex h-full items-center justify-between rounded-lg border border-white/6 bg-white/[0.03] px-[6%] backdrop-blur-md">
          <div className="flex items-center gap-[4%]">
            <div className="aspect-square h-[55%] rounded-md bg-gradient-to-br from-primary to-secondary shadow-md shadow-primary/30" />
            <span className="text-[7px] font-semibold text-white/90 sm:text-[8px]">Your Business</span>
          </div>
          <div className="flex gap-[6%]">
            {['Home', 'Services', 'Contact'].map((t) => (
              <span
                key={t}
                className={cn(
                  'text-[6px] sm:text-[7px]',
                  t === 'Home' ? 'font-semibold text-white' : 'text-white/45',
                )}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Slot>

      <Slot slot="hero">
        <div className="relative h-full overflow-hidden rounded-xl border border-white/8 shadow-2xl shadow-primary/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/35 via-secondary/25 to-cyan-500/10" />
          <motion.div
            className="absolute -top-[25%] -right-[15%] h-[70%] w-[50%] rounded-full bg-secondary/30 blur-2xl"
            animate={reduced ? undefined : { scale: [1, 1.1, 1], opacity: [0.4, 0.65, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute bottom-[26%] left-[7%] space-y-[5%]">
            <div className="h-[11%] w-[75%] rounded bg-white/28" />
            <div className="h-[7%] w-[55%] rounded bg-white/14" />
          </div>
          <motion.div
            className="absolute bottom-[8%] left-[7%] h-[10%] w-[34%] rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/40"
            animate={
              reduced
                ? undefined
                : {
                    boxShadow: [
                      '0 4px 20px rgba(59,130,246,0.3)',
                      '0 6px 28px rgba(59,130,246,0.5)',
                      '0 4px 20px rgba(59,130,246,0.3)',
                    ],
                  }
            }
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </Slot>

      <Slot slot="heroAside">
        <div className="flex h-full flex-col items-center justify-center gap-[6%] rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-[8%]">
          <div className="flex h-[40%] w-[40%] items-center justify-center rounded-full border-2 border-emerald-400/40 bg-emerald-500/10">
            <span className="text-[11px] font-bold text-emerald-400 sm:text-xs">98</span>
          </div>
          <span className="text-center text-[6px] font-medium text-emerald-400/80 sm:text-[7px]">
            Lighthouse
          </span>
        </div>
      </Slot>

      {[
        { key: 'card1' as const, icon: Zap, label: 'Fast' },
        { key: 'card2' as const, icon: Sparkles, label: 'Polished' },
        { key: 'card3' as const, icon: Rocket, label: 'Live' },
      ].map(({ key, icon: Icon, label }) => (
        <Slot key={key} slot={key}>
          <div className="h-full rounded-lg border border-white/8 bg-gradient-to-b from-white/[0.04] to-transparent p-[10%]">
            <div className="mb-[10%] flex h-[28%] w-[28%] items-center justify-center rounded-lg bg-primary/15">
              <Icon className="h-[55%] w-[55%] text-primary/80" />
            </div>
            <p className="text-[7px] font-semibold text-white/90 sm:text-[8px]">{label}</p>
            <div className="mt-[8%] h-[7%] w-full rounded bg-white/10" />
          </div>
        </Slot>
      ))}

      <Slot slot="cta">
        <div className="flex h-full items-center">
          <span className="rounded-full bg-gradient-to-r from-primary to-secondary px-[12%] py-[18%] text-[6px] font-semibold text-white shadow-lg shadow-primary/30 sm:text-[7px]">
            Get started today
          </span>
        </div>
      </Slot>

      <motion.div
        className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-1"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        <span className="font-mono text-[6px] text-emerald-400 sm:text-[7px]">vercel deploy ✓</span>
      </motion.div>
    </div>
  );
}
