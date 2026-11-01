'use client';

import Link from 'next/link';
import { productCategories, statusLabels } from '../data/products';
import { trackEvent } from '../utils/mixpanel';

const capabilities = [
    {
        title: 'Events & Ticketing',
        body: 'SoldOutAfrica, the organizer dashboard and Tokea — ticketing, merchandise and check-in at stadium scale.',
        href: '/products#events',
    },
    {
        title: 'Payments & Fraud',
        body: 'Card collection, M-Pesa and mobile money, with pre-authorisation fraud screening that wins chargebacks.',
        href: '/products#fintech',
    },
    {
        title: 'Lending & Core Banking',
        body: 'KYC, face verification, credit scoring and automated loan decisions on a full core banking ledger.',
        href: '/products#fintech',
    },
    {
        title: 'Communications & CRM',
        body: 'SMS, email and WhatsApp through one API, AI agents, customer intelligence and appointment booking.',
        href: '/products#business',
    },
];

const engineering = [
    'M-Pesa, Pesapal, Paystack and card rails',
    'Realtime settlement and split payouts',
    'Infrastructure sized for on-sale traffic peaks',
    'Self-hosted Kubernetes on our own clusters',
    'OIDC single sign-on across products',
    'Audit trails on every money movement',
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
            <section id="platform" className="relative px-4 md:px-8 py-24 md:py-32 bg-black/85 backdrop-blur-sm border-t border-white/10 scroll-mt-0">
                <div className="max-w-7xl mx-auto">
                    <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                        What We Build
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 max-w-4xl" style={{ fontFamily: 'var(--font-orbitron)' }}>
                        One engineering team. A full stack of African infrastructure.
                    </h2>
                    <p className="text-gray-400 text-lg max-w-3xl mb-16">
                        StdioX Labs builds and runs the products businesses depend on — how they sell, get paid, lend,
                        stay safe from fraud and talk to their customers. And for event organizers, we put up the capital too.
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {capabilities.map((item, index) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => handleClick(item.title, 'Capabilities')}
                                className="group p-8 border border-white/20 hover:border-white bg-white/5 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="text-3xl font-bold text-gray-600 group-hover:text-white mb-6 transition-colors" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                    0{index + 1}
                                </div>
                                <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">{item.body}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Suite */}
            <section className="relative px-4 md:px-8 py-24 md:py-32 bg-black/90 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                        <div>
                            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                Products
                            </p>
                            <h2 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                The Product Suite
                            </h2>
                        </div>
                        <Link
                            href="/products"
                            onClick={() => handleClick('Products', 'Product Suite')}
                            className="self-start md:self-auto px-6 py-3 border border-white/30 hover:border-white rounded-full text-sm hover:bg-white/10 transition-all duration-300"
                            style={{ fontFamily: 'var(--font-orbitron)' }}
                        >
                            All Products →
                        </Link>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-10">
                        {productCategories.map((category) => (
                            <div key={category.id}>
                                <h3 className="text-sm tracking-[0.2em] uppercase text-gray-400 mb-6 pb-4 border-b border-white/20" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                    {category.label}
                                </h3>
                                <ul className="space-y-6">
                                    {category.products.map((product) => (
                                        <li key={product.id}>
                                            <Link
                                                href={`/products#${product.id}`}
                                                onClick={() => handleClick(product.name, 'Product Suite')}
                                                className="group block"
                                            >
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="text-xl font-semibold group-hover:translate-x-1 transition-transform" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                                        {product.name}
                                                    </span>
                                                    {product.status === 'live' && (
                                                        <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/50 text-green-400 text-[10px] font-semibold uppercase rounded-full">
                                                            {statusLabels[product.status]}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-400 text-sm">{product.tagline}</p>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Funding */}
            <section className="relative px-4 md:px-8 py-24 md:py-32 bg-white text-black">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                            Funding
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
                            We don&apos;t just sell the tickets. We fund the event.
                        </h2>
                        <p className="text-gray-700 text-lg leading-relaxed mb-8">
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { step: 'Advance', body: 'Capital received weeks before the on-sale.' },
                            { step: 'Sell', body: 'Tickets sell over M-Pesa, card and mobile money.' },
                            { step: 'Self-Clear', body: 'The advance repays itself from ticket revenue.' },
                        ].map((item, index) => (
                            <div key={item.step} className="p-6 border-2 border-black">
                                <div className="text-3xl font-bold text-gray-300 mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                    0{index + 1}
                                </div>
                                <h3 className="font-semibold mb-2" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                    {item.step}
                                </h3>
                                <p className="text-gray-600 text-sm">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Engineering */}
            <section className="relative px-4 md:px-8 py-24 md:py-32 bg-black/85 backdrop-blur-sm border-t border-white/10">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
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
                        {engineering.map((item) => (
                            <li key={item} className="flex items-start gap-3 p-5 border-l-4 border-white bg-white/5">
                                <span className="text-white">→</span>
                                <span className="text-gray-300">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* CTA */}
            <section className="relative px-4 md:px-8 py-24 bg-black/90 border-t border-white/10 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
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
            </section>
        </div>
    );
}
