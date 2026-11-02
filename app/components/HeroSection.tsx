'use client';

import { useEffect, useState } from 'react';
import SiteNav from './SiteNav';
import { DotMatrixX } from './HomeVisuals';
import { MagneticLink } from './LiquidGlass';
import { productCategories } from '../data/products';
import { trackEvent } from '../utils/mixpanel';

const outcomes = ['sell out events.', 'get paid.', 'lend smarter.', 'stop fraud.', 'reach customers.'];

function RotatingOutcome() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setIndex((current) => (current + 1) % outcomes.length), 2800);
        return () => clearInterval(interval);
    }, []);

    return (
        <span key={index} className="block animate-word-in serif-accent text-zinc-200">
            {outcomes[index]}
        </span>
    );
}

function NairobiClock() {
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        const formatter = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Nairobi' });
        const tick = () => setTime(formatter.format(new Date()));
        const timeout = setTimeout(tick, 0);
        const interval = setInterval(tick, 15000);
        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, []);

    return <span className="tabular-nums">{time ?? '--:--'} EAT</span>;
}

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

            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-40 lg:pt-36 pb-4 md:pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                    {/* Copy */}
                    <div className="lg:col-span-7">
                        <p className="flex items-center gap-3 mb-6 text-sm text-zinc-400 animate-fade-up">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                            <span>
                                StdioX Labs · Nairobi · <NairobiClock />
                            </span>
                        </p>

                        <h1 className="text-[2.5rem] sm:text-6xl lg:text-[4rem] xl:text-[4.75rem] font-semibold leading-[1.02] tracking-[-0.035em] mb-6 animate-fade-up [animation-delay:100ms]">
                            Software that helps African businesses
                            <span className="block h-[1.2em] overflow-hidden text-[1.08em] leading-[1.15]">
                                <RotatingOutcome />
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl mb-10 animate-fade-up [animation-delay:200ms]">
                            We design, ship and run the ticketing, payments, lending and messaging platforms African businesses
                            depend on — engineered in Nairobi.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 animate-fade-up [animation-delay:300ms]">
                            <MagneticLink
                                href="/products"
                                onClick={() => handleNavigationClick('Products')}
                                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white text-black text-sm font-medium hover:bg-zinc-200"
                            >
                                See the products <span aria-hidden="true">→</span>
                            </MagneticLink>
                            <MagneticLink
                                href="/contact"
                                onClick={() => handleNavigationClick('Contact')}
                                className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-medium hover:bg-white/10"
                            >
                                Talk to the engineers
                            </MagneticLink>
                        </div>
                    </div>

                    {/* Signature mark */}
                    <div className="lg:col-span-5 animate-fade-up [animation-delay:250ms]">
                        <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[520px]">
                            <div className="absolute inset-[15%] rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                            <DotMatrixX className="relative" />
                        </div>
                    </div>
                </div>

                {/* Product lines */}
                <div className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-px rounded-3xl overflow-hidden border border-white/10 bg-white/10 animate-fade-up [animation-delay:400ms]">
                    {productCategories.map((category) => (
                        <a
                            key={category.id}
                            href={`/products#${category.id}`}
                            onClick={() => trackEvent('Category Clicked', { category: category.label, page: 'Home' })}
                            className="group flex items-center justify-between gap-4 bg-[#111113]/90 px-6 py-5 hover:bg-[#18181b] transition-colors"
                        >
                            <div className="min-w-0">
                                <p className="text-sm text-white">{category.label}</p>
                                <p className="text-xs text-zinc-500 truncate">{category.products.map((product) => product.name).join(' · ')}</p>
                            </div>
                            <span className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" aria-hidden="true">
                                →
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
