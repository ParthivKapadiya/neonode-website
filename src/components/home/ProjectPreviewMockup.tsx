'use client';

import type { PortfolioProject } from '@/types';
import { cn } from '@/lib/utils';

function ClinicPreview({ accentColor }: { accentColor: string }) {
  return (
    <div className="flex h-full flex-col bg-[#0a1218] p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded-md" style={{ backgroundColor: accentColor }} />
          <div className="h-1.5 w-12 rounded bg-white/30" />
        </div>
        <div className="flex gap-1">
          {['Home', 'Doctors', 'Contact'].map((t) => (
            <div key={t} className="h-1 w-6 rounded bg-white/10" />
          ))}
        </div>
      </div>
      <div
        className="mb-2 rounded-lg p-2"
        style={{ background: `linear-gradient(135deg, ${accentColor}30, transparent)` }}
      >
        <div className="h-2 w-3/4 rounded bg-white/25" />
        <div className="mt-1 h-1 w-1/2 rounded bg-white/15" />
      </div>
      <div className="grid flex-1 grid-cols-2 gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-md border border-white/5 bg-white/[0.03] p-1.5">
            <div className="mb-1 h-4 w-4 rounded-full bg-white/10" />
            <div className="h-1 w-full rounded bg-white/15" />
            <div className="mt-0.5 h-0.5 w-2/3 rounded bg-white/8" />
          </div>
        ))}
      </div>
      <div
        className="mt-2 rounded-md py-1 text-center text-[6px] font-medium text-white"
        style={{ backgroundColor: accentColor }}
      >
        Book Appointment
      </div>
    </div>
  );
}

function SaaSPreview({ accentColor }: { accentColor: string }) {
  return (
    <div className="flex h-full flex-col bg-[#0a0a14] p-3">
      <div className="mb-2 flex items-center gap-2">
        <div className="h-4 w-4 rounded-md" style={{ backgroundColor: accentColor }} />
        <div className="h-1.5 w-10 rounded bg-white/25" />
        <div className="ml-auto flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
          <span className="text-[5px] text-emerald-400">LIVE</span>
        </div>
      </div>
      <div className="mb-2 grid grid-cols-3 gap-1">
        {['Bid', 'League', 'Admin'].map((t) => (
          <div
            key={t}
            className="rounded border border-white/5 py-0.5 text-center text-[5px] text-white/50"
          >
            {t}
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-lg border border-white/5 bg-white/[0.02] p-2">
        <div className="mb-1 flex justify-between">
          <div className="h-1 w-8 rounded bg-white/20" />
          <div className="h-1 w-4 rounded" style={{ backgroundColor: `${accentColor}80` }} />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-1 flex items-center gap-1 rounded bg-white/[0.03] p-1">
            <div className="h-2 w-2 rounded-full bg-white/10" />
            <div className="h-0.5 flex-1 rounded bg-white/10" />
            <div className="h-2 w-4 rounded" style={{ backgroundColor: `${accentColor}40` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function GenericPreview({ gradient }: { gradient: string }) {
  return (
    <div className={cn('flex h-full flex-col p-3 bg-gradient-to-br', gradient)}>
      <div className="mb-2 h-2 w-1/3 rounded bg-white/25" />
      <div className="mb-1 h-3 w-2/3 rounded bg-white/20" />
      <div className="mb-3 h-1.5 w-1/2 rounded bg-white/10" />
      <div className="grid flex-1 grid-cols-3 gap-1">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded bg-white/10" />
        ))}
      </div>
    </div>
  );
}

function BrowserChrome({ url, children }: { url?: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-[#111] shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-white/5 bg-[#0d0d0d] px-2 py-1">
        <div className="h-1.5 w-1.5 rounded-full bg-red-500/70" />
        <div className="h-1.5 w-1.5 rounded-full bg-yellow-500/70" />
        <div className="h-1.5 w-1.5 rounded-full bg-green-500/70" />
        <div className="mx-auto h-3 max-w-[120px] flex-1 truncate rounded bg-white/5 px-2 text-[5px] leading-3 text-white/40">
          {url ?? 'project.preview'}
        </div>
      </div>
      <div className="aspect-[16/10]">{children}</div>
    </div>
  );
}

function renderPreview(project: PortfolioProject) {
  if (project.slug === 'patel-family-clinic') {
    return <ClinicPreview accentColor={project.accentColor} />;
  }
  if (project.slug === 'auctionxi-platform') {
    return <SaaSPreview accentColor={project.accentColor} />;
  }
  return <GenericPreview gradient={project.gradient} />;
}

interface ProjectPreviewMockupProps {
  project: PortfolioProject;
  variant?: 'inline' | 'device';
  className?: string;
}

export function ProjectPreviewMockup({
  project,
  variant = 'inline',
  className,
}: ProjectPreviewMockupProps) {
  const hostname = project.websiteUrl
    ? new URL(project.websiteUrl).hostname.replace('www.', '')
    : `${project.slug}.com`;

  const preview = renderPreview(project);

  if (variant === 'device') {
    return (
      <div className={cn('relative flex items-end justify-center gap-2', className)}>
        <div className="w-[78%]">
          <BrowserChrome url={hostname}>{preview}</BrowserChrome>
        </div>
        <div className="w-[20%] overflow-hidden rounded-md border-2 border-[#222] bg-[#111] shadow-xl">
          <div className="aspect-[9/16] origin-top scale-[1.02]">{preview}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <BrowserChrome url={hostname}>{preview}</BrowserChrome>
    </div>
  );
}

interface ProjectPreviewHoverProps {
  project: PortfolioProject;
}

export function ProjectPreviewHover({ project }: ProjectPreviewHoverProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/50 p-4 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100 md:p-6">
      <div className="w-full max-w-[90%] translate-y-4 scale-95 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
        <ProjectPreviewMockup project={project} variant="device" />
      </div>
    </div>
  );
}
