'use client';

import Link from 'next/link';
import SiteNav from './SiteNav';
import ProductVisual from './ProductVisual';
import { productCategories } from '../data/products';
import { trackEvent } from '../utils/mixpanel';

const ticketingAccent = productCategories[0].accent;

// Illustrative activity chips layered over the hero mockup. Sample data, not live metrics.
const floatingCards = [
    {
        label: 'StdioX Pay',
        title: 'M-Pesa · KES 4,500 received',
        accent: ['#34d399', '#a3e635'],
        position: '-left-6 md:-left-14 -top-8',
        delay: '0s',
    },
    {
        label: 'Looker',
        title: 'Approved · low risk · 38 ms',
        accent: ['#34d399', '#a3e635'],
        position: '-right-4 md:-right-10 top-1/2',
        delay: '1.5s',
    },
    {
        label: 'StdioX Comms',
        title: 'WhatsApp ticket delivered',
        accent: ['#38bdf8', '#818cf8'],
        position: '-left-4 md:-left-10 -bottom-6',
        delay: '3s',
    },
];

export default function HeroSection() {
    const handleNavigationClick = (destination: string) => {
        trackEvent('Navigation Clicked', {
            destination: destination,
            from_page: 'Home',
            location: 'Hero Section',
        });
    };

    const fadeIn = (delay: string) => `animate-fade-up ${delay}`;

    return (
        <section className="relative min-h-screen overflow-hidden bg-black">
            <SiteNav />

            {/* Background: grid and aurora glows */}
            <div className="absolute inset-0 bg-grid pointer-events-none" />
            <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full blur-3xl opacity-25 pointer-events-none bg-gradient-to-br from-violet-500 to-fuchsia-500 animate-aurora" />
            <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 pointer-events-none bg-gradient-to-br from-emerald-400 to-sky-500 animate-aurora [animation-delay:-6s]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-32 md:pt-40 pb-24 grid lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-12 items-center min-h-screen">
                {/* Copy */}
                <div>
                    <Link
                        href="/funding"
                        onClick={() => handleNavigationClick('Funding')}
                        className={`group inline-flex items-center gap-3 pl-1.5 pr-4 py-1.5 mb-8 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur text-sm text-gray-300 hover:border-white/30 hover:bg-white/[0.08] ${fadeIn('')}`}
                    >
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-black bg-gradient-to-r from-violet-300 to-amber-200">
                            New
                        </span>
                        Event prefinancing on SoldOutAfrica
                        <span className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
                    </Link>

                    <h1 className={`font-sans text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02] text-white mb-8 ${fadeIn('[animation-delay:150ms]')}`}>
                        The infrastructure behind{' '}
                        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent animate-gradient">
                            African business.
                        </span>
                    </h1>

                    <p className={`text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl mb-10 ${fadeIn('[animation-delay:300ms]')}`}>
                        StdioX Labs builds and runs ticketing, payments, lending and communications platforms — and funds the events that sell on them.
                    </p>

                    <div className={`flex flex-col sm:flex-row gap-3 mb-14 ${fadeIn('[animation-delay:500ms]')}`}>
                        <Link
                            href="/products"
                            onClick={() => handleNavigationClick('Products')}
                            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300"
                        >
                            Explore products
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                        <Link
                            href="/contact"
                            onClick={() => handleNavigationClick('Contact')}
                            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-all duration-300"
                        >
                            Talk to our team
                        </Link>
                    </div>

                    {/* Product lines */}
                    <div className={`grid grid-cols-3 gap-4 max-w-lg border-t border-white/10 pt-6 ${fadeIn('[animation-delay:700ms]')}`}>
                        {productCategories.map((category) => (
                            <a
                                key={category.id}
                                href={`/products#${category.id}`}
                                onClick={() => trackEvent('Category Clicked', { category: category.label, page: 'Home' })}
                                className="group"
                            >
                                <span className="block h-0.5 w-8 mb-3 rounded-full group-hover:w-12 transition-all" style={{ background: `linear-gradient(90deg, ${category.accent[0]}, ${category.accent[1]})` }} />
                                <span className="block text-sm text-gray-300 group-hover:text-white transition-colors leading-snug">
                                    {category.label.split(' ')[0]}
                                </span>
                                <span className="block text-xs text-gray-600 mt-1">{category.products.length} products</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Product mockup */}
                <div className={`relative mx-4 md:mx-10 lg:mx-0 lg:ml-8 ${fadeIn('[animation-delay:300ms]')}`}>
                    <div className="lg:[transform:perspective(1600px)_rotateY(-8deg)_rotateX(4deg)]">
                        <ProductVisual productId="soldoutafrica" accent={ticketingAccent} />
                    </div>
                    {floatingCards.map((card) => (
                        <div
                            key={card.label}
                            className={`absolute ${card.position} hidden sm:flex items-center gap-3 px-4 py-3 rounded-xl border border-white/15 bg-black/70 backdrop-blur-xl shadow-2xl animate-float`}
                            style={{ animationDelay: card.delay }}
                        >
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: card.accent[0], boxShadow: `0 0 12px ${card.accent[0]}` }} />
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500">{card.label}</p>
                                <p className="text-xs text-white font-medium whitespace-nowrap">{card.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
