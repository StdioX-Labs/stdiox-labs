'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import ProductVisual from './ProductVisual';
import { ActivityFeed, CardScreen, ChatTyping, ScoreGauge, StackDiagram, TicketPulse } from './HomeVisuals';
import { Eyebrow, MagneticLink } from './LiquidGlass';
import { allProducts, productCategories, statusLabels } from '../data/products';
import { trackEvent } from '../utils/mixpanel';

// Neutral chrome accent so the product mockups sit inside the gray glass theme.
const chrome: [string, string] = ['#f4f4f5', '#71717a'];

const capabilities = [
    {
        title: 'Ticketing for Business',
        body: 'SoldOutAfrica, event prefinancing, white-label storefronts and a ticketing API for event companies, venues and brands.',
        href: '/products#events',
        visual: <TicketPulse />,
        className: 'md:col-span-2',
    },
    {
        title: 'Payments & Fraud',
        body: 'Card and mobile money collection, screened before authorisation.',
        href: '/products#pay',
        visual: <CardScreen />,
        className: '',
    },
    {
        title: 'Lending & Core Banking',
        body: 'KYC, credit scoring and automated loan decisions on a full ledger.',
        href: '/products#score',
        visual: <ScoreGauge />,
        className: '',
    },
    {
        title: 'Communications & CRM',
        body: 'SMS, email and WhatsApp through one API, AI agents, customer intelligence and bookings.',
        href: '/products#business',
        visual: <ChatTyping />,
        className: 'md:col-span-2',
    },
];

const rails = ['M-Pesa', 'Visa', 'Mastercard', 'Pesapal', 'Paystack', '3-D Secure', 'USSD', 'WhatsApp', 'SMS', 'Email', 'OIDC SSO', 'Kubernetes'];

const stackLayers = [
    { name: 'Products', items: allProducts.map((product) => product.name.replace('StdioX ', '')) },
    {
        name: 'Shared services',
        items: ['M-Pesa, Pesapal, Paystack & card rails', 'Realtime settlement & split payouts', 'OIDC single sign-on', 'SMS, email & WhatsApp', 'Audit trails on every money movement'],
    },
    { name: 'Infrastructure', items: ['Self-hosted Kubernetes', 'Our own clusters', 'Sized for on-sale traffic peaks'] },
];

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
            <section id="platform" className="relative px-4 md:px-8 py-20 md:py-32 lg:py-40 scroll-mt-24">
                <div className="max-w-7xl mx-auto">
                    <div data-reveal className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:items-end mb-12 md:mb-20">
                        <div>
                            <Eyebrow index="01">What we build</Eyebrow>
                            <h2 className="text-[2rem] sm:text-[2.75rem] lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.05]">
                                One engineering team.{' '}
                                <span className="serif-accent text-zinc-400">A full stack of African infrastructure.</span>
                            </h2>
                        </div>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            The products businesses depend on to sell tickets, get paid, lend, stay safe from fraud and talk to
                            their customers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-row-dense gap-4">
                        {capabilities.map((item, index) => (
                            <Fragment key={item.title}>
                                <Link
                                    href={item.href}
                                    onClick={() => handleClick(item.title, 'Capabilities')}
                                    data-reveal
                                    style={{ transitionDelay: `${index * 90}ms` }}
                                    className={`glass group flex flex-col rounded-3xl p-6 ${item.className}`}
                                >
                                    <div className="h-48 mb-6">{item.visual}</div>
                                    <div className="mt-auto flex items-end justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-medium tracking-tight mb-1.5">{item.title}</h3>
                                            <p className="text-sm text-zinc-400 leading-relaxed max-w-md">{item.body}</p>
                                        </div>
                                        <span className="grid place-items-center w-10 h-10 shrink-0 rounded-full border border-white/15 text-zinc-300 group-hover:bg-white group-hover:text-black group-hover:rotate-[-45deg] transition-all duration-500">
                                            →
                                        </span>
                                    </div>
                                </Link>
                                {index === 1 && (
                                    <div data-reveal style={{ transitionDelay: '180ms' }} className="glass flex flex-col rounded-3xl p-6 md:col-span-2 lg:col-span-1 lg:row-span-2">
                                        <div className="flex items-center justify-between gap-3 mb-1.5">
                                            <h3 className="text-lg font-medium tracking-tight">Across the stack</h3>
                                            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-zinc-300">Live preview</span>
                                        </div>
                                        <p className="text-sm text-zinc-400 mb-3">One team runs every product, so events flow between them.</p>
                                        <div className="flex-1 max-h-[360px] lg:max-h-none overflow-hidden [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
                                            <ActivityFeed />
                                        </div>
                                    </div>
                                )}
                            </Fragment>
                        ))}
                    </div>
                    <p className="mt-4 text-xs text-zinc-500">Figures in these illustrations are sample data.</p>
                </div>
            </section>

            {/* Rails Marquee */}
            <section className="relative px-4 md:px-8" aria-label="Rails and channels we integrate">
                <div data-reveal className="glass max-w-7xl mx-auto rounded-full py-5 md:py-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
                    <div className="flex w-max animate-marquee">
                        {[...rails, ...rails].map((rail, i) => (
                            <span key={i} className={`flex items-center gap-10 mx-5 text-2xl md:text-3xl whitespace-nowrap ${i % 2 ? 'serif-accent text-zinc-200' : 'font-medium tracking-tight text-zinc-500'}`}>
                                {rail}
                                <span className="w-1 h-1 rounded-full bg-zinc-600" />
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products */}
            <section className="relative px-4 md:px-8 py-20 md:py-32 lg:py-40">
                <div className="max-w-7xl mx-auto">
                    <div data-reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 mb-10 md:mb-16">
                        <div>
                            <Eyebrow index="02">Products</Eyebrow>
                            <h2 className="text-[2rem] sm:text-[2.75rem] lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.05]">
                                Built. Shipped. <span className="serif-accent text-zinc-400">Running.</span>
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
                            // On two-column tablets the odd last card spans the row and lays out side by side.
                            const wide = index === productCategories.length - 1 && productCategories.length % 2 === 1;
                            return (
                                <article
                                    key={category.id}
                                    data-reveal
                                    style={{ transitionDelay: `${index * 120}ms` }}
                                    className={`glass flex flex-col rounded-[2rem] p-3 ${wide ? 'md:col-span-2 xl:col-span-1' : ''}`}
                                >
                                    <a
                                        href={flagshipHref}
                                        target={flagship.url ? '_blank' : undefined}
                                        rel={flagship.url ? 'noopener noreferrer' : undefined}
                                        onClick={() => trackEvent('Product Clicked', { product_name: flagship.name, product_url: flagshipHref, page: 'Home' })}
                                        className={`group block rounded-[1.25rem] p-4 sm:p-5 hover:bg-white/[0.03] transition-colors ${wide ? 'md:max-xl:grid md:max-xl:grid-cols-2 md:max-xl:gap-8 md:max-xl:items-center' : ''}`}
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-5">
                                                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">{category.label.split(' ')[0]}</span>
                                                <span className="text-[10px] uppercase tracking-widest text-zinc-300 border border-white/15 rounded-full px-2.5 py-1">
                                                    {statusLabels[flagship.status]}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{flagship.name}</h3>
                                            <p className="text-zinc-400 mt-1 mb-6">{flagship.tagline}</p>
                                        </div>
                                        <div className="group-hover:-translate-y-1 transition-transform duration-500">
                                            <ProductVisual productId={flagship.id} accent={chrome} />
                                        </div>
                                    </a>
                                    <div className={`mt-auto pt-2 ${wide ? 'md:max-xl:grid md:max-xl:grid-cols-2 md:max-xl:gap-x-3' : ''}`}>
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

            {/* Engineering */}
            <section className="relative px-4 md:px-8 pb-20 md:pb-32 lg:pb-40">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                    <div data-reveal className="lg:col-span-5">
                        <Eyebrow index="03">Under the hood</Eyebrow>
                        <h2 className="text-[2rem] sm:text-[2.75rem] lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] mb-6">
                            Built from first principles. <span className="serif-accent text-zinc-400">Run by us.</span>
                        </h2>
                        <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                            Every product shares the same engineering backbone — payment rails, identity, messaging and
                            infrastructure we design, deploy and operate ourselves. We also build custom platforms for
                            partners on the same stack.
                        </p>
                    </div>
                    <div data-reveal className="lg:col-span-7">
                        <StackDiagram layers={stackLayers} />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative px-4 md:px-8 pb-16 md:pb-28">
                <div data-reveal className="glass max-w-7xl mx-auto rounded-[2rem] px-5 py-14 md:py-28 text-center overflow-hidden">
                    <h2 className="text-[2.25rem] sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] leading-[1] mb-6">
                        Let&apos;s build <span className="serif-accent text-zinc-400">what&apos;s next.</span>
                    </h2>
                    <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
                        Product demos, partnerships or a custom build — talk to the engineers directly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <MagneticLink
                            href="/contact"
                            onClick={() => handleClick('Contact', 'Home CTA')}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-zinc-200"
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
