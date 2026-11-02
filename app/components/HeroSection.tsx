'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import SiteNav from './SiteNav';
import { DotField } from './HomeVisuals';
import { Eyebrow } from './LiquidGlass';
import { buttonPrimary, buttonSecondary } from './ui';
import { trackEvent } from '../utils/mixpanel';

/**
 * Two-step opening: the logo's X, then (as the page scrolls) the same dots regrouping into Africa.
 * On large screens the dots stay pinned beside the text; on small screens each step shows its own shape.
 */
export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const progress = useRef(0);

    useEffect(() => {
        const update = () => {
            const section = sectionRef.current;
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const travel = rect.height - window.innerHeight;
            const scrolled = travel > 0 ? -rect.top / travel : 0;
            // Hold the X for the first fifth of the scroll, then morph across the middle of the section.
            progress.current = Math.min(1, Math.max(0, (scrolled - 0.2) / 0.55));
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    const handleNavigationClick = (destination: string) => {
        trackEvent('Navigation Clicked', {
            destination: destination,
            from_page: 'Home',
            location: 'Hero Section',
        });
    };

    return (
        <section ref={sectionRef} className="relative text-white">
            <SiteNav />

            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-6 xl:col-span-7">
                    {/* Step one */}
                    <div className="lg:min-h-screen flex flex-col justify-center pt-32 md:pt-40 lg:pt-24 pb-10 lg:pb-0 animate-fade-up">
                        <Eyebrow>stdiox labs · nairobi</Eyebrow>
                        <h1 className="text-[2.75rem] sm:text-6xl lg:text-[4.5rem] xl:text-[5.25rem] font-medium leading-[0.98] tracking-[-0.04em] mb-7">
                            We build and run software for businesses in Africa.
                        </h1>
                        <p className="text-lg text-zinc-400 leading-relaxed max-w-xl mb-10">
                            Ticketing, payments, fraud screening, lending and customer messaging, starting with SoldOutAfrica, our
                            ticketing platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/products" onClick={() => handleNavigationClick('Products')} className={buttonPrimary}>
                                See our products
                            </Link>
                            <Link href="/contact" onClick={() => handleNavigationClick('Contact')} className={buttonSecondary}>
                                Book a demo
                            </Link>
                        </div>
                        <p className="hidden lg:flex items-center gap-3 mt-16 text-xs lowercase tracking-[0.25em] text-zinc-500">
                            <span className="block w-8 h-px bg-zinc-700" />
                            scroll
                        </p>
                    </div>

                    <DotField shape="x" className="lg:hidden mx-auto max-w-[300px] sm:max-w-[380px]" />

                    {/* Step two */}
                    <div className="lg:min-h-screen flex flex-col justify-center pt-20 pb-10 lg:py-0">
                        <Eyebrow>where we work</Eyebrow>
                        <h2 className="text-[2.25rem] sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.02] tracking-[-0.035em] mb-6 max-w-xl">
                            Built in Nairobi, for businesses across Africa.
                        </h2>
                        <p className="text-lg text-zinc-400 leading-relaxed max-w-xl">
                            Our products are designed around how people here pay and talk to businesses: M-Pesa and mobile money,
                            cards with 3-D Secure, USSD, SMS and WhatsApp, and ticket sales that spike the minute an event goes on
                            sale.
                        </p>
                    </div>

                    <DotField shape="africa" className="lg:hidden mx-auto max-w-[340px] sm:max-w-[420px] mb-6" />
                </div>

                {/* Pinned dots that morph from the X to Africa */}
                <div className="hidden lg:block lg:col-span-6 xl:col-span-5">
                    <div className="sticky top-0 h-screen flex items-center justify-center">
                        <DotField progress={progress} className="max-w-[540px]" />
                    </div>
                </div>
            </div>
        </section>
    );
}
