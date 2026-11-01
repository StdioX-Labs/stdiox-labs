'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import SiteNav from './SiteNav';
import { MagneticLink } from './LiquidGlass';
import { productCategories } from '../data/products';
import { trackEvent } from '../utils/mixpanel';

const headline = ['Software', 'that', 'helps', 'African', 'business'];
const outcomes = ['sell out events', 'get paid', 'lend smarter', 'stop fraud', 'reach customers'];

// Sample events cycled through the hero feed. Illustrative, not live data.
const activity = [
    { product: 'SoldOutAfrica', event: 'Ticket sold', detail: 'VIP · KES 6,000 · M-Pesa' },
    { product: 'Looker', event: 'Card approved', detail: 'Risk 0.08 · 41 ms' },
    { product: 'StdioX Comms', event: 'WhatsApp delivered', detail: 'E-ticket · +254 7•• ••• 214' },
    { product: 'Score', event: 'Loan decisioned', detail: 'KES 25,000 · approved' },
    { product: 'StdioX Pay', event: 'Payment settled', detail: 'USD 48.00 · Visa' },
    { product: 'SoldOutAfrica', event: 'Gate scan', detail: 'Regular · Gate B' },
    { product: 'Looker', event: '3-D Secure challenge', detail: 'Velocity rule · 1.2 s' },
    { product: 'StdioX Bookings', event: 'Deposit received', detail: 'Salon · KES 1,000' },
];

const FEED_SIZE = 4;
const FEED_INTERVAL = 2400;

function RotatingOutcome() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setIndex((current) => (current + 1) % outcomes.length), 2600);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="glass inline-flex items-center rounded-full px-5 md:px-7 pb-1 md:pb-2 pt-0.5 md:pt-1 overflow-hidden whitespace-nowrap">
            <span key={index} className="animate-word-in text-white">
                {outcomes[index]}
            </span>
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

function ActivityFeed() {
    const [items, setItems] = useState(() => activity.slice(0, FEED_SIZE).map((item, id) => ({ ...item, id })));

    useEffect(() => {
        let next = FEED_SIZE;
        const interval = setInterval(() => {
            const item = { ...activity[next % activity.length], id: next };
            next += 1;
            setItems((current) => [item, ...current.slice(0, FEED_SIZE - 1)]);
        }, FEED_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    return (
        <ul className="space-y-2.5">
            {items.map((item, index) => (
                <li
                    key={item.id}
                    className={`flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 ${index === 0 ? 'animate-feed-in' : ''}`}
                    style={{ opacity: 1 - index * 0.18 }}
                >
                    <span className="grid place-items-center w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-500 text-[11px] font-semibold text-black">
                        {item.product.replace('StdioX ', '').slice(0, 2)}
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm text-white truncate">{item.event}</p>
                        <p className="text-xs text-zinc-500 truncate font-mono">{item.detail}</p>
                    </div>
                    <div className="text-right shrink-0">
                        <p className="text-[11px] text-zinc-300">{item.product}</p>
                        <p className="text-[10px] text-zinc-600 font-mono">{index === 0 ? 'now' : `${Math.round((index * FEED_INTERVAL) / 1000)}s`}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default function HeroSection() {
    const tiltRef = useRef<HTMLDivElement>(null);

    const handleNavigationClick = (destination: string) => {
        trackEvent('Navigation Clicked', {
            destination: destination,
            from_page: 'Home',
            location: 'Hero Section',
        });
    };

    const handleTilt = (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== 'mouse' || !tiltRef.current) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        tiltRef.current.style.transform = `perspective(1400px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    };

    const resetTilt = () => {
        if (tiltRef.current) tiltRef.current.style.transform = '';
    };

    return (
        <section className="relative min-h-screen flex flex-col text-white">
            <SiteNav />

            <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-40 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-12 items-center">
                {/* Copy */}
                <div>
                    <p className="flex items-center gap-3 mb-10 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 animate-fade-up">
                        <span className="relative flex w-2 h-2">
                            <span className="absolute inset-0 rounded-full bg-zinc-200 animate-ping opacity-60" />
                            <span className="relative w-2 h-2 rounded-full bg-zinc-100" />
                        </span>
                        StdioX Labs · Nairobi <NairobiClock />
                    </p>

                    <h1 className="text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[5.25rem] lg:leading-[1] font-semibold tracking-[-0.035em] mb-10">
                        {headline.map((word, index) => (
                            <span key={word} className="inline-block overflow-hidden align-bottom pb-[0.1em] mr-[0.22em]">
                                <span
                                    className={`inline-block animate-rise ${index < 3 ? 'text-zinc-500 font-normal' : 'text-white'}`}
                                    style={{ animationDelay: `${120 + index * 80}ms` }}
                                >
                                    {word}
                                </span>
                            </span>
                        ))}
                        <span className="block mt-3 text-[2rem] sm:text-5xl lg:text-[4.25rem] animate-fade-up [animation-delay:600ms]">
                            <RotatingOutcome />
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl mb-12 animate-fade-up [animation-delay:750ms]">
                        We design, ship and run ticketing, payments, lending and messaging platforms from Nairobi — and front
                        the capital for the events that sell on them.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 animate-fade-up [animation-delay:900ms]">
                        <MagneticLink
                            href="/products"
                            onClick={() => handleNavigationClick('Products')}
                            className="group inline-flex items-center justify-center gap-3 pl-7 pr-2 py-2 rounded-full bg-zinc-100 text-black font-medium hover:bg-white"
                        >
                            See the products
                            <span className="grid place-items-center w-9 h-9 rounded-full bg-black text-white group-hover:rotate-[-45deg] transition-transform duration-300">→</span>
                        </MagneticLink>
                        <MagneticLink
                            href="/contact"
                            onClick={() => handleNavigationClick('Contact')}
                            className="glass inline-flex items-center justify-center px-7 py-3.5 rounded-full text-white font-medium"
                        >
                            Talk to the engineers
                        </MagneticLink>
                    </div>
                </div>

                {/* Activity panel */}
                <div className="relative animate-fade-up [animation-delay:400ms]" onPointerMove={handleTilt} onPointerLeave={resetTilt}>
                    <div ref={tiltRef} className="relative transition-transform duration-500 ease-out will-change-transform">
                        {/* Depth layers */}
                        <div className="glass hidden sm:block absolute inset-0 rounded-[2rem] translate-x-5 translate-y-5 rotate-2 opacity-60" />
                        <div className="glass hidden sm:block absolute inset-0 rounded-[2rem] translate-x-10 translate-y-10 rotate-[4deg] opacity-30" />

                        <div className="glass rounded-[2rem] p-5 md:p-6">
                            <div className="flex items-center justify-between mb-5 px-1">
                                <div>
                                    <p className="text-sm font-medium">Across the stack</p>
                                    <p className="text-xs text-zinc-500">Ticketing · Payments · Lending · Messaging</p>
                                </div>
                                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 border border-white/10 rounded-full px-2.5 py-1">
                                    Sample
                                </span>
                            </div>
                            <ActivityFeed />
                        </div>
                    </div>
                </div>
            </div>

            {/* Product line dock */}
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-8 animate-fade-up [animation-delay:1100ms]">
                <div className="glass rounded-3xl grid grid-cols-1 sm:grid-cols-[repeat(3,1fr)_auto] divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                    {productCategories.map((category) => (
                        <a
                            key={category.id}
                            href={`/products#${category.id}`}
                            onClick={() => trackEvent('Category Clicked', { category: category.label, page: 'Home' })}
                            className="group flex items-center justify-between gap-4 px-6 py-5 hover:bg-white/[0.04] transition-colors first:rounded-t-3xl sm:first:rounded-l-3xl sm:first:rounded-tr-none"
                        >
                            <div className="min-w-0">
                                <p className="text-sm text-white">{category.label}</p>
                                <p className="text-xs text-zinc-500 truncate">{category.products.map((product) => product.name).join(' · ')}</p>
                            </div>
                            <span className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
                        </a>
                    ))}
                    <a
                        href="#platform"
                        onClick={() => handleNavigationClick('Platform')}
                        className="hidden sm:flex items-center gap-3 px-6 py-5 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500 hover:text-white transition-colors"
                    >
                        Scroll
                        <span className="relative block w-px h-8 bg-white/10 overflow-hidden">
                            <span className="absolute inset-0 bg-white animate-scroll-line" />
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
}
