'use client';

import { useEffect } from 'react';
import { LiquidScene } from './components/LiquidGlass';
import HeroSection from './components/HeroSection';
import PlatformSections from './components/PlatformSections';
import SiteFooter from './components/SiteFooter';
import { trackPageView } from './utils/mixpanel';

export default function Home() {
  useEffect(() => {
    trackPageView('Home', {
      page_title: 'StdioX Labs - Home',
      page_path: '/',
    });
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0b0b0d]">
      <LiquidScene />
      <div className="relative z-10">
        <HeroSection />
        <PlatformSections />
        <SiteFooter />
      </div>
    </div>
  );
}
