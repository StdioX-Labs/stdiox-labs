'use client';

import Link from 'next/link';
import SiteNav from './SiteNav';
import { DotMatrixX } from './HomeVisuals';
import { Eyebrow } from './LiquidGlass';
import { buttonPrimary, buttonSecondary } from './ui';
import { trackEvent } from '../utils/mixpanel';

export default function HeroSection() {
    const handleNavigationClick = (destination: string) => {
        trackEvent('Navigation Clicked', {
            destination: destination,
            from_page: 'Home',
            location: 'Hero Section',
        });
    };

    return (
        <section className="relative text-white">
            <SiteNav />

            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-40 pb-12 md:pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    <div className="lg:col-span-7 animate-fade-up">
                        <Eyebrow>stdiox labs · nairobi</Eyebrow>

                        <h1 className="text-[2.5rem] sm:text-6xl lg:text-[4.25rem] font-semibold leading-[1.04] tracking-[-0.03em] mb-6 max-w-3xl">
                            We build and run software for businesses in Africa.
                        </h1>

                        <p className="text-lg text-zinc-400 leading-relaxed max-w-xl mb-10">
                            Our products cover ticketing, payments, fraud screening, lending and customer messaging, starting with
                            SoldOutAfrica, our ticketing platform.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/products" onClick={() => handleNavigationClick('Products')} className={buttonPrimary}>
                                See our products
                            </Link>
                            <Link href="/contact" onClick={() => handleNavigationClick('Contact')} className={buttonSecondary}>
                                Book a demo
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-5 animate-fade-up [animation-delay:150ms]">
                        <DotMatrixX className="mx-auto max-w-[300px] sm:max-w-[380px] lg:max-w-[460px]" />
                    </div>
                </div>
            </div>
        </section>
    );
}
