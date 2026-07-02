'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Lock, RotateCw } from 'lucide-react';
import { defaultTransition, EASE_OUT } from '@/lib/motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';
import {
  PHASES,
  LOOP_MS,
  activePhaseIndex,
  autoPlayProgress,
  phaseWeights,
} from './constants';
import {
  BlueprintLayer,
  LaunchLayer,
  StructureLayer,
  StyleLayer,
} from './phase-layers';

function PhaseLayer({ weight, children }: { weight: number; children: React.ReactNode }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 will-change-[opacity]"
      style={{ opacity: weight }}
    >
      {children}
    </div>
  );
}

function ScrubPlayhead({ progress }: { progress: MotionValue<number> }) {
  const left = useTransform(progress, (p) => `${p * 100}%`);

  return (
    <motion.div className="pointer-events-none absolute inset-y-0 z-20 w-0" style={{ left }}>
      <div className="absolute top-0 bottom-0 -left-px w-0.5 bg-gradient-to-b from-transparent via-primary to-transparent shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
      <div className="absolute top-1/2 -left-1.5 h-3 w-3 -translate-y-1/2 rounded-full border border-primary/50 bg-primary/30 shadow-lg shadow-primary/40" />
    </motion.div>
  );
}

export function HeroBuildCanvas({
  onProgressChange,
}: {
  onProgressChange?: (progress: number) => void;
}) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { x: mouseX, y: mouseY } = useMousePosition();

  const [rawProgress, setRawProgress] = useState(reduced ? 1 : 0);
  const [hovering, setHovering] = useState(false);
  const [scrubbing, setScrubbing] = useState(false);
  const progressRef = useRef(0);
  const rafRef = useRef(0);
  const startRef = useRef(0);

  const progressMotion = useMotionValue(reduced ? 1 : 0);
  const smoothProgress = useSpring(progressMotion, { stiffness: 140, damping: 26, mass: 0.6 });

  const rotateX = useSpring(0, { stiffness: 55, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 55, damping: 22 });

  useEffect(() => {
    progressRef.current = rawProgress;
    progressMotion.set(rawProgress);
    onProgressChange?.(rawProgress);
  }, [rawProgress, progressMotion, onProgressChange]);

  useEffect(() => {
    if (reduced) return;
    rotateX.set((mouseY - 0.5) * -2.5);
    rotateY.set((mouseX - 0.5) * 4);
  }, [mouseX, mouseY, rotateX, rotateY, reduced]);

  const scrubFromPointer = useCallback((clientX: number) => {
    const el = canvasRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setRawProgress(Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)));
  }, []);

  useEffect(() => {
    if (reduced || hovering || scrubbing) return;

    startRef.current = performance.now() - progressRef.current * LOOP_MS;

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      setRawProgress(autoPlayProgress(elapsed, LOOP_MS));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduced, hovering, scrubbing]);

  const weights = phaseWeights(rawProgress);
  const activePhase = activePhaseIndex(rawProgress);
  const activeMeta = PHASES[activePhase];

  const progressBarWidth = useTransform(smoothProgress, (p) => `${p * 100}%`);
  const progressThumbLeft = useTransform(smoothProgress, (p) => `${p * 100}%`);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setRawProgress((p) => Math.min(1, p + 0.04));
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setRawProgress((p) => Math.max(0, p - 0.04));
    }
  };

  return (
    <motion.div
      className="relative mx-auto w-full max-w-xl lg:max-w-none"
      initial={reduced ? false : { opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...defaultTransition, delay: reduced ? 0 : 0.35, ease: EASE_OUT }}
    >
      <div className="absolute -inset-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)]" />
      <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-cyan-500/5 via-primary/6 to-secondary/5 blur-3xl" />

      <motion.div style={{ perspective: 1300, rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        <div
          ref={canvasRef}
          className={cn(
            'relative overflow-hidden rounded-2xl border border-white/10 bg-[#05070d]',
            'shadow-[0_24px_80px_-12px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.04)_inset]',
            scrubbing || hovering ? 'cursor-ew-resize' : 'cursor-default',
          )}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => {
            setHovering(false);
            setScrubbing(false);
          }}
          onMouseDown={(e) => {
            setScrubbing(true);
            scrubFromPointer(e.clientX);
          }}
          onMouseUp={() => setScrubbing(false)}
          onMouseMove={(e) => {
            if (hovering && (scrubbing || e.buttons === 1)) scrubFromPointer(e.clientX);
          }}
          onTouchStart={(e) => {
            setHovering(true);
            setScrubbing(true);
            const touch = e.touches[0];
            if (touch) scrubFromPointer(touch.clientX);
          }}
          onTouchEnd={() => setScrubbing(false)}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            if (touch) scrubFromPointer(touch.clientX);
          }}
          role="slider"
          aria-label="Scrub through website build phases"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(rawProgress * 100)}
          aria-valuetext={`${activeMeta.label}: ${activeMeta.sub}`}
        >
          <div className="flex items-center gap-2 border-b border-white/5 bg-[#030508] px-3 py-2 sm:px-4 sm:py-2.5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
            </div>

            <div className="mx-auto flex min-w-0 max-w-[min(100%,240px)] flex-1 items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5">
              <RotateCw className="hidden h-3 w-3 shrink-0 text-white/25 sm:block" aria-hidden="true" />
              <Lock className="h-3 w-3 shrink-0 text-emerald-400/70" aria-hidden="true" />
              <span className="truncate font-mono text-[9px] text-white/55 sm:text-[10px]">
                https://
                <span className="text-cyan-400/90">yourbusiness</span>
                .com
              </span>
            </div>

            <div
              className="hidden shrink-0 rounded-md px-2 py-1 sm:block"
              style={{
                backgroundColor: `${activeMeta.color}18`,
                border: `1px solid ${activeMeta.color}33`,
              }}
            >
              <span
                className="text-[9px] font-semibold tracking-wide uppercase"
                style={{ color: activeMeta.color }}
              >
                {activeMeta.label}
              </span>
            </div>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden bg-[#06080f]">
            <PhaseLayer weight={reduced ? 0 : weights.blueprint}>
              <BlueprintLayer />
            </PhaseLayer>
            <PhaseLayer weight={reduced ? 0 : weights.structure}>
              <StructureLayer />
            </PhaseLayer>
            <PhaseLayer weight={reduced ? 0 : weights.style}>
              <StyleLayer />
            </PhaseLayer>
            <PhaseLayer weight={reduced ? 1 : weights.launch}>
              <LaunchLayer />
            </PhaseLayer>

            {(hovering || scrubbing) && !reduced && <ScrubPlayhead progress={smoothProgress} />}

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.35)_100%)]" />
          </div>

          <div className="border-t border-white/5 bg-[#030508]/95 px-3 py-3 backdrop-blur-md sm:px-4">
            <div className="mb-2.5 flex items-end justify-between gap-3">
              <div>
                <p className="text-[9px] font-medium tracking-[0.22em] text-muted uppercase sm:text-[10px]">
                  {scrubbing ? 'Scrubbing' : hovering ? 'Drag to explore' : 'Building'}
                </p>
                <p className="mt-0.5 text-xs font-medium text-white sm:text-sm">{activeMeta.sub}</p>
              </div>
              <p className="font-mono text-lg font-semibold tabular-nums text-white sm:text-xl">
                {String(Math.round(rawProgress * 100)).padStart(3, '0')}
                <span className="text-sm text-muted">%</span>
              </p>
            </div>

            <div className="relative mb-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-400 via-primary to-emerald-400"
                style={{ width: progressBarWidth }}
              />
              {PHASES.map((_, i) => (
                <div
                  key={PHASES[i].id}
                  className="absolute top-0 bottom-0 w-px bg-white/10"
                  style={{ left: `${((i + 1) / 4) * 100}%` }}
                  aria-hidden="true"
                />
              ))}
              <motion.div
                className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/20 bg-white shadow-lg shadow-primary/30"
                style={{ left: progressThumbLeft }}
              />
            </div>

            <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
              {PHASES.map((phase, i) => {
                const isActive = activePhase === i;
                return (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() => setRawProgress((i + 0.5) / 4)}
                    className={cn(
                      'rounded-lg px-1 py-2 text-left transition-all duration-300 sm:px-2',
                      isActive ? 'bg-white/[0.06] ring-1 ring-white/10' : 'hover:bg-white/[0.03]',
                    )}
                    style={isActive ? { boxShadow: `inset 0 0 0 1px ${phase.color}33` } : undefined}
                  >
                    <p
                      className="text-[8px] font-bold tracking-wider uppercase sm:text-[9px]"
                      style={{ color: isActive ? phase.color : undefined }}
                    >
                      <span className={cn(!isActive && 'text-muted')}>{phase.label}</span>
                    </p>
                    <p className="mt-0.5 hidden truncate text-[9px] text-muted sm:block">{phase.sub}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <motion.p
          className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[11px] text-muted"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, ease: EASE_OUT }}
        >
          <span>Drag to scrub the build</span>
          <span className="hidden text-white/20 sm:inline" aria-hidden="true">
            ·
          </span>
          <span className="hidden sm:inline">← → keyboard</span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
