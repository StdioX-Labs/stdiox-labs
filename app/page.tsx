import PulsatingDots from './components/PulsatingDots';
import HeroSection from './components/HeroSection';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <PulsatingDots />
      <HeroSection />
    </div>
  );
}
