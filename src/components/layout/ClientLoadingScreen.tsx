'use client';

import dynamic from 'next/dynamic';

export const ClientLoadingScreen = dynamic(
  () => import('@/components/layout/LoadingScreen').then((mod) => mod.LoadingScreen),
  { ssr: false },
);
