'use client';

import { useEffect } from 'react';
import PulsatingDots from './components/PulsatingDots';
import HeroSection from './components/HeroSection';
import { trackPageView } from './utils/mixpanel';

export default function Home() {
  useEffect(() => {
    trackPageView('Home', {
      page_title: 'StdioX Labs - Home',
      page_path: '/',
    });
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <PulsatingDots />
      <HeroSection />
    </div>
  );
}
