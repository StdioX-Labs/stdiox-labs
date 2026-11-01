'use client';

import Link from 'next/link';
import ProductShowcase from './ProductShowcase';
import { productCategories } from '../data/products';
import { trackEvent } from '../utils/mixpanel';

const [events, fintech, business] = productCategories;

const capabilities = [
    {
        title: 'Ticketing for Business',
        body: 'SoldOutAfrica, white-label storefronts and a ticketing API for event companies, venues and brands.',
        href: '/products#events',
        accent: events.accent,
    },
    {
        title: 'Payments & Fraud',
        body: 'Card collection, M-Pesa and mobile money, with pre-authorisation fraud screening that wins chargebacks.',
        href: '/products#pay',
        accent: fintech.accent,
    },
    {
        title: 'Lending & Core Banking',
        body: 'KYC, face verification, credit scoring and automated loan decisions on a full core banking ledger.',
        href: '/products#score',
        accent: fintech.accent,
    },
    {
        title: 'Communications & CRM',
        body: 'SMS, email and WhatsApp through one API, AI agents, customer intelligence and appointment booking.',
        href: '/products#business',
        accent: business.accent,
    },
];

const rails = ['M-Pesa', 'Visa', 'Mastercard', 'Pesapal', 'Paystack', '3-D Secure', 'USSD', 'WhatsApp', 'SMS', 'Email', 'OIDC SSO', 'Kubernetes'];

const engineering = [
    'M-Pesa, Pesapal, Paystack and card rails',
    'Realtime settlement and split payouts',
    'Infrastructure sized for on-sale traffic peaks',
    'Self-hosted Kubernetes on our own clusters',
    'OIDC single sign-on across products',
    'Audit trails on every money movement',
];

// Cumulative organizer cash position over the 8 weeks before an event, in arbitrary units.
const withoutFunding = [0, -30, -30, -55, -55, -75, -60, -30, 10];
const withFunding = [0, 40, 40, 15, 15, 0, 20, 50, 90];

const toPath = (values: number[]) =>
    values.map((v, i) => `${i === 0 ? 'M' : 'L'} ${(i / (values.length - 1)) * 300} ${100 - v * 0.9}`).join(' ');

export default function PlatformSections() {
    const handleClick = (destination: string, location: string) => {
        trackEvent('Navigation Clicked', {
            destination: destination,
            from_page: 'Home',
            location: location,
        });
    };

    return (
        <div className="relative text-white">
            {/* Capabilities */}
            <section id="platform" className="relative px-4 md:px-8 py-24 md:py-32 bg-black/90 backdrop-blur-sm border-t border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-grid pointer-events-none" />
                <div className="relative max-w-7xl mx-auto">
                    <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                        What We Build
                    </p>
                    <h2 className="text-3xl md:text-6xl font-bold mb-6 max-w-5xl leading-tight" style={{ fontFamily: 'var(--font-orbitron)' }}>
                        One engineering team.{' '}
                        <span className="bg-gradient-to-r from-violet-400 via-emerald-300 to-sky-400 bg-clip-text text-transparent">
                            A full stack of African infrastructure.
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl mb-16">
                        StdioX Labs builds and runs the products businesses depend on — how they sell tickets, get paid,
                        lend, stay safe from fraud and talk to their customers. And for event organizers, we put up the capital too.
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {capabilities.map((item, index) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => handleClick(item.title, 'Capabilities')}
                                className="group relative p-8 rounded-2xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.07] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${item.accent[0]}, ${item.accent[1]})` }} />
                                <div
                                    className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                                    style={{ background: item.accent[0] }}
                                />
                                <div
                                    className="text-4xl font-bold mb-8 bg-clip-text text-transparent"
                                    style={{ fontFamily: 'var(--font-orbitron)', backgroundImage: `linear-gradient(135deg, ${item.accent[0]}, ${item.accent[1]})` }}
                                >
                                    0{index + 1}
                                </div>
                                <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">{item.body}</p>
                                <span className="inline-block mt-6 text-sm text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all">Explore →</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Rails Marquee */}
            <section className="relative py-8 bg-black border-y border-white/10 overflow-hidden" aria-label="Rails and channels we integrate">
                <div className="flex w-max animate-marquee">
                    {[...rails, ...rails].map((rail, i) => (
                        <span
                            key={i}
                            className="mx-8 text-xl md:text-2xl font-bold text-white/25 whitespace-nowrap"
                            style={{ fontFamily: 'var(--font-orbitron)' }}
                        >
                            {rail}
                        </span>
                    ))}
                </div>
            </section>

            {/* Flagship Products */}
            <section className="relative px-4 md:px-8 py-24 md:py-32 bg-black overflow-hidden">
                <div className="relative max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
                        <div>
                            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                Products
                            </p>
                            <h2 className="text-3xl md:text-6xl font-bold" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                Built. Shipped. Running.
                            </h2>
                        </div>
                        <Link
                            href="/products"
                            onClick={() => handleClick('Products', 'Flagship Products')}
                            className="self-start md:self-auto px-6 py-3 border border-white/30 hover:border-white rounded-full text-sm hover:bg-white/10 transition-all duration-300"
                            style={{ fontFamily: 'var(--font-orbitron)' }}
                        >
                            All Products →
                        </Link>
                    </div>

                    <div className="space-y-28 md:space-y-40">
                        {productCategories.map((category, index) => (
                            <div key={category.id}>
                                <p
                                    className="text-xs tracking-[0.3em] uppercase mb-10 font-semibold"
                                    style={{ fontFamily: 'var(--font-orbitron)', color: category.accent[0] }}
                                >
                                    {category.label}
                                </p>
                                <ProductShowcase product={category.products[0]} accent={category.accent} reverse={index % 2 === 1} page="Home" />
                                <div className="flex flex-wrap gap-3 mt-12">
                                    <span className="text-gray-500 text-sm py-2">Also in {category.label}:</span>
                                    {category.products.slice(1).map((product) => (
                                        <Link
                                            key={product.id}
                                            href={`/products#${product.id}`}
                                            onClick={() => handleClick(product.name, 'Flagship Products')}
                                            className="px-4 py-2 rounded-full border border-white/15 text-sm text-gray-300 hover:text-white hover:border-white/40 transition-colors"
                                        >
                                            {product.name} →
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Funding */}
            <section className="relative px-4 md:px-8 py-24 md:py-32 overflow-hidden text-black bg-gradient-to-br from-violet-300 via-fuchsia-200 to-amber-100">
                <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="text-xs tracking-[0.3em] uppercase text-black/60 mb-4 font-semibold" style={{ fontFamily: 'var(--font-orbitron)' }}>
                            Funding
                        </p>
                        <h2 className="text-3xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-orbitron)' }}>
                            We don&apos;t just sell the tickets. We fund the event.
                        </h2>
                        <p className="text-black/70 text-lg leading-relaxed mb-10">
                            Event prefinancing advances the venue deposit, artist fee and marketing budget before a single
                            ticket sells — repaid automatically from ticket revenue. No collateral, no separate repayment
                            schedule. Our V2 capital pool is sized for stadium shows, not just club nights.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/funding"
                                onClick={() => handleClick('Funding', 'Funding Section')}
                                className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 text-center"
                                style={{ fontFamily: 'var(--font-orbitron)' }}
                            >
                                How Prefinancing Works
                            </Link>
                            <Link
                                href="/contact"
                                onClick={() => handleClick('Contact', 'Funding Section')}
                                className="px-8 py-4 border-2 border-black rounded-full font-semibold hover:bg-black/5 transition-all duration-300 hover:scale-105 text-center"
                                style={{ fontFamily: 'var(--font-orbitron)' }}
                            >
                                Talk to Us
                            </Link>
                        </div>
                    </div>

                    {/* Cash position chart */}
                    <div className="rounded-3xl bg-black text-white p-6 md:p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <p className="font-semibold" style={{ fontFamily: 'var(--font-orbitron)' }}>Organizer cash position</p>
                            <p className="text-gray-500 text-xs">Illustrative</p>
                        </div>
                        <svg viewBox="0 -10 300 200" className="w-full h-auto" role="img" aria-label="Cash position with and without prefinancing over the eight weeks before an event">
                            <defs>
                                <linearGradient id="funded-line" x1="0" x2="1">
                                    <stop offset="0" stopColor="#a78bfa" />
                                    <stop offset="1" stopColor="#f472b6" />
                                </linearGradient>
                            </defs>
                            <line x1="0" x2="300" y1="100" y2="100" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" />
                            <path d={toPath(withoutFunding)} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeLinejoin="round" />
                            <path d={toPath(withFunding)} fill="none" stroke="url(#funded-line)" strokeWidth="3.5" strokeLinejoin="round" />
                            <text x="0" y="185" fill="rgba(255,255,255,0.4)" fontSize="9">Week −8</text>
                            <text x="300" y="185" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="end">Event</text>
                        </svg>
                        <div className="flex flex-wrap gap-6 mt-4 text-xs">
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-1 rounded-full bg-gradient-to-r from-violet-400 to-pink-400" /> With prefinancing
                            </span>
                            <span className="flex items-center gap-2 text-gray-400">
                                <span className="w-4 h-1 rounded-full bg-white/35" /> Out of your own pocket
                            </span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mt-8">
                            {[
                                { step: 'Advance', body: 'Weeks before on-sale' },
                                { step: 'Sell', body: 'M-Pesa, card, mobile money' },
                                { step: 'Self-clear', body: 'Repaid from tickets' },
                            ].map((item, index) => (
                                <div key={item.step} className="rounded-xl border border-white/10 p-3">
                                    <p className="text-gray-500 text-[10px] mb-1" style={{ fontFamily: 'var(--font-orbitron)' }}>0{index + 1}</p>
                                    <p className="font-semibold text-sm">{item.step}</p>
                                    <p className="text-gray-500 text-xs mt-1">{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Engineering */}
            <section className="relative px-4 md:px-8 py-24 md:py-32 bg-black border-t border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-grid pointer-events-none" />
                <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
                    <div>
                        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                            Under the Hood
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
                            Built from first principles. Run by us.
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Every product shares the same engineering backbone — payment rails, identity, messaging and
                            infrastructure we design, deploy and operate ourselves. We also build custom platforms for
                            partners on the same stack.
                        </p>
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-4 content-start">
                        {engineering.map((item, index) => {
                            const accent = productCategories[index % productCategories.length].accent;
                            return (
                                <li key={item} className="flex items-start gap-3 p-5 rounded-xl border border-white/10 bg-white/[0.03]">
                                    <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})` }} />
                                    <span className="text-gray-300">{item}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>

            {/* CTA */}
            <section className="relative px-4 md:px-8 py-28 bg-black border-t border-white/10 text-center overflow-hidden">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full blur-3xl opacity-20 pointer-events-none bg-gradient-to-r from-violet-500 via-emerald-400 to-sky-500" />
                <div className="relative">
                    <h2 className="text-3xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
                        Let&apos;s build something exceptional.
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                        Product demos, partnerships, event funding or a custom build — talk to the engineers directly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            onClick={() => handleClick('Contact', 'Home CTA')}
                            className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105"
                            style={{ fontFamily: 'var(--font-orbitron)' }}
                        >
                            Get in Touch
                        </Link>
                        <Link
                            href="/about"
                            onClick={() => handleClick('About', 'Home CTA')}
                            className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105"
                            style={{ fontFamily: 'var(--font-orbitron)' }}
                        >
                            About Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
