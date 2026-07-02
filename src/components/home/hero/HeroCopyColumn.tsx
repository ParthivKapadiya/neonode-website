'use client';

import { HeroHeadline } from './HeroHeadline';
import { HeroStatsRow } from './HeroStatsRow';
import { HeroButtons } from './HeroButtons';
import { HeroTrustStrip } from './HeroTrustStrip';

export function HeroCopyColumn() {
  return (
    <div className="max-w-xl lg:max-w-none">
      <HeroHeadline />
      <HeroStatsRow />
      <HeroButtons />
      <HeroTrustStrip />
    </div>
  );
}
