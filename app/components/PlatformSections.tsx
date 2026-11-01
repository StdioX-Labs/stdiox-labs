'use client';

import Link from 'next/link';
import ProductVisual from './ProductVisual';
import { MagneticLink } from './LiquidGlass';
import { productCategories, statusLabels } from '../data/products';
import { trackEvent } from '../utils/mixpanel';

// Neutral chrome accent so the product mockups sit inside the gray glass theme.
const chrome: [string, string] = ['#f4f4f5', '#71717a'];

const capabilities = [
    {
        title: 'Ticketing for Business',
        body: 'SoldOutAfrica, white-label storefronts and a ticketing API for event companies, venues and brands.',
        href: '/products#events',
    },
    {
        title: 'Payments & Fraud',
        body: 'Card collection, M-Pesa and mobile money, with pre-authorisation fraud screening that wins chargebacks.',
        href: '/products#pay',
    },
    {
        title: 'Lending & Core Banking',
        body: 'KYC, face verification, credit scoring and automated loan decisions on a full core banking ledger.',
        href: '/products#score',
    },
    {
        title: 'Communications & CRM',
        body: 'SMS, email and WhatsApp through one API, AI agents, customer intelligence and appointment booking.',
        href: '/products#business',
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

function Eyebrow({ index, children }: { index: string; children: string }) {
    return (
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500 mb-6">
            <span className="text-zinc-300">{index}</span>
            <span className="w-8 h-px bg-zinc-700" />
            {children}
        </p>
    );
}

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
            <section id="platform" className="relative px-4 md:px-8 py-28 md:py-40 scroll-mt-24">
                <div className="max-w-7xl mx-auto">
                    <div data-reveal className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:items-end mb-16 md:mb-20">
                        <div>
                            <Eyebrow index="01">What we build</Eyebrow>
                            <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.05]">
                                One engineering team.{' '}
                                <span className="text-zinc-500">A full stack of African infrastructure.</span>
                            </h2>
                        </div>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            The products businesses depend on to sell tickets, get paid, lend, stay safe from fraud and talk to
                            their customers. And for event organizers, we put up the capital too.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {capabilities.map((item, index) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => handleClick(item.title, 'Capabilities')}
                                data-reveal
                                style={{ transitionDelay: `${index * 90}ms` }}
                                className="glass group flex flex-col rounded-[1.75rem] p-7 min-h-[300px] hover:-translate-y-1.5"
                            >
                                <span className="font-mono text-xs text-zinc-500">0{index + 1}</span>
                                <h3 className="mt-auto text-xl font-medium tracking-tight mb-3">{item.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{item.body}</p>
                                <span className="mt-6 grid place-items-center w-10 h-10 rounded-full border border-white/15 text-zinc-300 group-hover:bg-white group-hover:text-black group-hover:rotate-[-45deg] transition-all duration-500">
                                    →
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Rails Marquee */}
            <section className="relative px-4 md:px-8" aria-label="Rails and channels we integrate">
                <div data-reveal className="glass max-w-7xl mx-auto rounded-full py-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
                    <div className="flex w-max animate-marquee">
                        {[...rails, ...rails].map((rail, i) => (
                            <span key={i} className="flex items-center gap-10 mx-5 text-lg md:text-xl font-medium tracking-tight text-zinc-400 whitespace-nowrap">
                                {rail}
                                <span className="w-1 h-1 rounded-full bg-zinc-600" />
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products */}
            <section className="relative px-4 md:px-8 py-28 md:py-40">
                <div className="max-w-7xl mx-auto">
                    <div data-reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
                        <div>
                            <Eyebrow index="02">Products</Eyebrow>
                            <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.05]">
                                Built. Shipped. <span className="text-zinc-500">Running.</span>
                            </h2>
                        </div>
                        <MagneticLink
                            href="/products"
                            onClick={() => handleClick('Products', 'Flagship Products')}
                            className="glass self-start md:self-auto inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm"
                        >
                            All products <span>→</span>
                        </MagneticLink>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {productCategories.map((category, index) => {
                            const [flagship, ...others] = category.products;
                            const flagshipHref = flagship.url ?? `/products#${flagship.id}`;
                            return (
                                <article
                                    key={category.id}
                                    data-reveal
                                    style={{ transitionDelay: `${index * 120}ms` }}
                                    className="glass flex flex-col rounded-[2rem] p-3"
                                >
                                    <a
                                        href={flagshipHref}
                                        target={flagship.url ? '_blank' : undefined}
                                        rel={flagship.url ? 'noopener noreferrer' : undefined}
                                        onClick={() => trackEvent('Product Clicked', { product_name: flagship.name, product_url: flagshipHref, page: 'Home' })}
                                        className="group block rounded-[1.6rem] p-5 hover:bg-white/[0.03] transition-colors"
                                    >
                                        <div className="flex items-center justify-between mb-5">
                                            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">{category.label}</span>
                                            <span className="text-[10px] uppercase tracking-widest text-zinc-300 border border-white/15 rounded-full px-2.5 py-1">
                                                {statusLabels[flagship.status]}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{flagship.name}</h3>
                                        <p className="text-zinc-400 mt-1 mb-6">{flagship.tagline}</p>
                                        <div className="group-hover:-translate-y-1 transition-transform duration-500">
                                            <ProductVisual productId={flagship.id} accent={chrome} />
                                        </div>
                                    </a>
                                    <div className="mt-auto pt-2">
                                        {others.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/products#${product.id}`}
                                                onClick={() => handleClick(product.name, 'Flagship Products')}
                                                className="group flex items-center justify-between gap-4 rounded-2xl px-5 py-4 border-t border-white/[0.07] hover:bg-white/[0.05] transition-colors"
                                            >
                                                <div className="min-w-0">
                                                    <p className="text-sm text-white">{product.name}</p>
                                                    <p className="text-xs text-zinc-500 truncate">{product.tagline}</p>
                                                </div>
                                                <span className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
                                            </Link>
                                        ))}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Funding */}
            <section className="relative px-4 md:px-8 pb-28 md:pb-40">
                <div data-reveal className="glass max-w-7xl mx-auto rounded-[2.5rem] p-6 md:p-14 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div>
                        <Eyebrow index="03">Funding</Eyebrow>
                        <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.05] mb-6">
                            We sell the tickets. <span className="text-zinc-500">We fund the event.</span>
                        </h2>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                            Event prefinancing advances the venue deposit, artist fee and marketing budget before a single
                            ticket sells — repaid automatically from ticket revenue. No collateral, no separate repayment
                            schedule. Our V2 capital pool is sized for stadium shows, not just club nights.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <MagneticLink
                                href="/funding"
                                onClick={() => handleClick('Funding', 'Funding Section')}
                                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-zinc-100 text-black font-medium hover:bg-white"
                            >
                                How prefinancing works
                            </MagneticLink>
                            <MagneticLink
                                href="/contact"
                                onClick={() => handleClick('Contact', 'Funding Section')}
                                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 font-medium hover:bg-white/10"
                            >
                                Talk to us
                            </MagneticLink>
                        </div>
                    </div>

                    {/* Cash position chart */}
                    <div className="rounded-[1.75rem] bg-black/40 border border-white/10 p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <p className="font-medium">Organizer cash position</p>
                            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Illustrative</p>
                        </div>
                        <svg viewBox="0 -10 300 200" className="w-full h-auto" role="img" aria-label="Cash position with and without prefinancing over the eight weeks before an event">
                            <defs>
                                <linearGradient id="funded-line" x1="0" x2="1">
                                    <stop offset="0" stopColor="#71717a" />
                                    <stop offset="1" stopColor="#ffffff" />
                                </linearGradient>
                                <linearGradient id="funded-fill" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0" stopColor="rgba(255,255,255,0.18)" />
                                    <stop offset="1" stopColor="rgba(255,255,255,0)" />
                                </linearGradient>
                            </defs>
                            <line x1="0" x2="300" y1="100" y2="100" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 5" />
                            <path d={`${toPath(withFunding)} L 300 100 L 0 100 Z`} fill="url(#funded-fill)" />
                            <path d={toPath(withoutFunding)} pathLength={1} strokeDasharray="1" className="draw-path" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinejoin="round" />
                            <path d={toPath(withFunding)} pathLength={1} strokeDasharray="1" className="draw-path" fill="none" stroke="url(#funded-line)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                            <text x="0" y="185" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="monospace">WEEK −8</text>
                            <text x="300" y="185" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="monospace" textAnchor="end">EVENT</text>
                        </svg>
                        <div className="flex flex-wrap gap-6 mt-4 text-xs">
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-0.5 rounded-full bg-white" /> With prefinancing
                            </span>
                            <span className="flex items-center gap-2 text-zinc-500">
                                <span className="w-4 h-0.5 rounded-full bg-white/30" /> Out of your own pocket
                            </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-8">
                            {[
                                { step: 'Advance', body: 'Weeks before on-sale' },
                                { step: 'Sell', body: 'M-Pesa, card, mobile money' },
                                { step: 'Self-clear', body: 'Repaid from tickets' },
                            ].map((item, index) => (
                                <div key={item.step} className="rounded-2xl bg-white/[0.04] border border-white/[0.07] p-3">
                                    <p className="font-mono text-zinc-600 text-[10px] mb-1">0{index + 1}</p>
                                    <p className="font-medium text-sm">{item.step}</p>
                                    <p className="text-zinc-500 text-xs mt-1">{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Engineering */}
            <section className="relative px-4 md:px-8 pb-28 md:pb-40">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
                    <div data-reveal>
                        <Eyebrow index="04">Under the hood</Eyebrow>
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] mb-6">
                            Built from first principles. <span className="text-zinc-500">Run by us.</span>
                        </h2>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            Every product shares the same engineering backbone — payment rails, identity, messaging and
                            infrastructure we design, deploy and operate ourselves. We also build custom platforms for
                            partners on the same stack.
                        </p>
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-3 content-start">
                        {engineering.map((item, index) => (
                            <li
                                key={item}
                                data-reveal
                                style={{ transitionDelay: `${index * 70}ms` }}
                                className="glass flex items-start gap-4 rounded-2xl p-5"
                            >
                                <span className="font-mono text-xs text-zinc-600 mt-0.5">0{index + 1}</span>
                                <span className="text-zinc-300">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* CTA */}
            <section className="relative px-4 md:px-8 pb-28">
                <div data-reveal className="glass max-w-7xl mx-auto rounded-[2.5rem] px-6 py-20 md:py-28 text-center overflow-hidden">
                    <h2 className="text-4xl md:text-7xl font-semibold tracking-[-0.04em] leading-[1] mb-6">
                        Let&apos;s build <span className="text-zinc-500">what&apos;s next.</span>
                    </h2>
                    <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
                        Product demos, partnerships, event funding or a custom build — talk to the engineers directly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <MagneticLink
                            href="/contact"
                            onClick={() => handleClick('Contact', 'Home CTA')}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-zinc-100 text-black font-medium hover:bg-white"
                        >
                            Get in touch
                        </MagneticLink>
                        <MagneticLink
                            href="/about"
                            onClick={() => handleClick('About', 'Home CTA')}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 font-medium hover:bg-white/10"
                        >
                            About us
                        </MagneticLink>
                    </div>
                </div>
            </section>
        </div>
    );
}
