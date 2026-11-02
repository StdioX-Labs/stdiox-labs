'use client';

import Image from 'next/image';
import Link from 'next/link';
import { StackDiagram } from './HomeVisuals';
import { Eyebrow } from './LiquidGlass';
import { buttonPrimary, buttonSecondary } from './ui';
import { allProducts, productCategories, statusLabels } from '../data/products';
import { trackEvent } from '../utils/mixpanel';

const soldOutAfrica = allProducts.find((product) => product.id === 'soldoutafrica');

const stackLayers = [
    {
        name: 'Products',
        description: 'What customers use',
        items: allProducts.map((product) => product.name.replace('StdioX ', '')),
    },
    {
        name: 'Shared services',
        description: 'Built once, used by every product',
        items: ['M-Pesa, Pesapal, Paystack and card rails', 'Realtime settlement and split payouts', 'Single sign-on', 'SMS, email and WhatsApp', 'Audit trails on money movements'],
    },
    {
        name: 'Infrastructure',
        description: 'Run by us',
        items: ['Kubernetes on our own clusters', 'Sized for on-sale traffic peaks'],
    },
];

const sectionHeading = 'text-[2rem] sm:text-[2.75rem] lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.05]';

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
            {/* Product index */}
            <section id="platform" className="px-4 md:px-8 py-16 md:py-28 scroll-mt-24">
                <div className="max-w-7xl mx-auto">
                    <div data-reveal className="grid lg:grid-cols-12 gap-6 lg:gap-8 lg:items-end mb-10 md:mb-14">
                        <div className="lg:col-span-7">
                            <Eyebrow>products</Eyebrow>
                            <h2 className={sectionHeading}>What we make</h2>
                        </div>
                        <p className="lg:col-span-5 text-zinc-400 text-base md:text-lg leading-relaxed">
                            Every product is built and run by the same team in Nairobi. Some are open to any business; others we set
                            up with you.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {productCategories.map((category) => (
                            <div key={category.id} data-reveal className="glass rounded-3xl overflow-hidden">
                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6 px-6 md:px-8 pt-6 pb-4">
                                    <h3 className="text-white font-medium">{category.label}</h3>
                                    <p className="text-sm text-zinc-500 sm:text-right max-w-md">{category.summary}</p>
                                </div>
                                <ul className="divide-y divide-white/[0.07] border-t border-white/[0.07]">
                                    {category.products.map((product) => (
                                        <li key={product.id}>
                                            <Link
                                                href={`/products#${product.id}`}
                                                onClick={() => handleClick(product.name, 'Product Index')}
                                                className="group grid grid-cols-[1fr_auto] md:grid-cols-[14rem_1fr_7rem_1.5rem] items-center gap-x-6 gap-y-1 px-6 md:px-8 py-4 hover:bg-white/[0.04] transition-colors"
                                            >
                                                <span className="text-white">{product.name}</span>
                                                <span className="order-3 md:order-none col-span-2 md:col-span-1 text-sm text-zinc-400">{product.tagline}</span>
                                                <span className="hidden md:block text-xs text-zinc-500">{statusLabels[product.status]}</span>
                                                <span className="text-zinc-600 group-hover:text-brand transition-colors" aria-hidden="true">
                                                    →
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SoldOutAfrica */}
            {soldOutAfrica && (
                <section className="px-4 md:px-8 pb-16 md:pb-28">
                    <div data-reveal className="glass max-w-7xl mx-auto rounded-[2rem] p-4 md:p-6 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-5 overflow-hidden rounded-[1.25rem] bg-black">
                            <Image
                                src="/soldoutafrica.jpg"
                                alt="SoldOutAfrica, powered by StdioX"
                                width={805}
                                height={933}
                                className="w-full h-auto max-h-[520px] object-contain"
                            />
                        </div>
                        <div className="lg:col-span-7 px-2 pb-4 lg:px-0 lg:pb-0 lg:pr-6">
                            <Eyebrow>our ticketing platform</Eyebrow>
                            <h2 className={`${sectionHeading} mb-5`}>SoldOutAfrica</h2>
                            <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-4">{soldOutAfrica.description}</p>
                            <p className="text-zinc-400 leading-relaxed mb-8">
                                Organizers selling on SoldOutAfrica can also apply for event prefinancing: the venue deposit, artist
                                advance and marketing budget paid up front, then recovered from ticket sales.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href="https://soldoutafrica.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackEvent('Product Clicked', { product_name: 'SoldOutAfrica', product_url: 'https://soldoutafrica.com/', page: 'Home' })}
                                    className={buttonPrimary}
                                >
                                    Visit soldoutafrica.com
                                </a>
                                <Link href="/products#prefinancing" onClick={() => handleClick('Prefinancing', 'SoldOutAfrica')} className={buttonSecondary}>
                                    About prefinancing
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Stack */}
            <section className="px-4 md:px-8 pb-16 md:pb-28">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                    <div data-reveal className="lg:col-span-4">
                        <Eyebrow>how it fits together</Eyebrow>
                        <h2 className={`${sectionHeading} mb-5`}>One stack under every product</h2>
                        <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                            Payments, identity, messaging and hosting are built once and shared. We also build custom platforms for
                            partners on the same stack.
                        </p>
                    </div>
                    <div data-reveal className="lg:col-span-8">
                        <StackDiagram layers={stackLayers} />
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="px-4 md:px-8 pb-16 md:pb-28">
                <div data-reveal className="glass max-w-7xl mx-auto rounded-[2rem] p-6 md:p-12 grid lg:grid-cols-12 gap-10 lg:gap-12 lg:items-end">
                    <div className="lg:col-span-6">
                        <Eyebrow>contact</Eyebrow>
                        <h2 className={`${sectionHeading} mb-5`}>Talk to the team</h2>
                        <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-md">
                            Demos, partnerships and custom builds. You&apos;ll be speaking to the engineers who build the products.
                        </p>
                    </div>
                    <div className="lg:col-span-6 space-y-2">
                        <a
                            href="mailto:info@stdiox.com"
                            onClick={() => handleClick('Email', 'Home Contact')}
                            className="group flex items-center justify-between gap-4 border-b border-white/10 py-4 text-xl md:text-2xl hover:text-zinc-300 transition-colors"
                        >
                            info@stdiox.com
                            <span className="text-zinc-600 group-hover:text-brand transition-colors" aria-hidden="true">→</span>
                        </a>
                        <a
                            href="tel:+254183053254"
                            onClick={() => handleClick('Phone', 'Home Contact')}
                            className="group flex items-center justify-between gap-4 border-b border-white/10 py-4 text-xl md:text-2xl hover:text-zinc-300 transition-colors"
                        >
                            +254 183 053 254
                            <span className="text-zinc-600 group-hover:text-brand transition-colors" aria-hidden="true">→</span>
                        </a>
                        <div className="pt-6">
                            <Link href="/contact" onClick={() => handleClick('Contact', 'Home Contact')} className={buttonPrimary}>
                                Book a demo
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
