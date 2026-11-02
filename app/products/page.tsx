'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import ProductShowcase from '../components/ProductShowcase';
import { Eyebrow, GlassPage, MagneticLink, PageHeader } from '../components/LiquidGlass';
import { productCategories } from '../data/products';
import { trackPageView, trackEvent } from '../utils/mixpanel';

export default function ProductsPage() {
    useEffect(() => {
        trackPageView('Products', {
            page_title: 'StdioX Labs - Products',
            page_path: '/products',
        });
    }, []);

    return (
        <GlassPage>
            <PageHeader
                eyebrow="The StdioX stack"
                title="Products that run"
                muted="African business."
                lead="Ticketing, payments, lending and communications — built by one engineering team on one stack, and sold to the businesses that depend on them."
            >
                {/* Category jump links */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-5xl">
                    {productCategories.map((category, index) => (
                        <a
                            key={category.id}
                            href={`#${category.id}`}
                            onClick={() => trackEvent('Category Clicked', { category: category.label, page: 'Products' })}
                            className="glass group flex items-center justify-between gap-4 rounded-2xl px-5 py-4"
                        >
                            <div className="min-w-0">
                                <p className="font-mono text-[10px] text-zinc-500 mb-1">0{index + 1}</p>
                                <p className="text-sm text-white">{category.label}</p>
                            </div>
                            <span className="text-zinc-500 group-hover:text-white group-hover:translate-y-0.5 transition-all">↓</span>
                        </a>
                    ))}
                </div>
            </PageHeader>

            {productCategories.map((category, categoryIndex) => (
                <section key={category.id} id={category.id} className="px-4 md:px-8 py-14 md:py-24 scroll-mt-24">
                    <div className="max-w-7xl mx-auto">
                        <div data-reveal className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 lg:items-end mb-10 md:mb-14">
                            <div>
                                <Eyebrow index={`0${categoryIndex + 1}`}>{category.label.split(' ')[0]}</Eyebrow>
                                <h2 className="text-[2.1rem] sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.05]">
                                    {category.label}
                                </h2>
                            </div>
                            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">{category.summary}</p>
                        </div>
                        <div className="space-y-5 md:space-y-6">
                            {category.products.map((product, index) => (
                                <ProductShowcase key={product.id} product={product} reverse={index % 2 === 1} page="Products" />
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            {/* Funding callout */}
            <section className="px-4 md:px-8 py-14 md:py-24">
                <Link
                    href="/funding"
                    data-reveal
                    onClick={() => trackEvent('Product Clicked', { product_name: 'Event Prefinancing', product_url: '/funding', page: 'Products' })}
                    className="glass group block max-w-7xl mx-auto rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-14"
                >
                    <Eyebrow>Funding</Eyebrow>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                        <div>
                            <h2 className="text-[2.1rem] sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] mb-4">
                                We prefinance events.
                            </h2>
                            <p className="text-zinc-400 text-base md:text-lg max-w-2xl">
                                Venue deposits, artist advances and marketing — fronted from a dedicated capital pool and repaid
                                automatically from ticket sales.
                            </p>
                        </div>
                        <span className="shrink-0 grid place-items-center w-14 h-14 rounded-full bg-zinc-100 text-black text-xl group-hover:rotate-[-45deg] transition-transform duration-500">
                            →
                        </span>
                    </div>
                </Link>
            </section>

            {/* Bottom CTA */}
            <section className="px-4 md:px-8 pb-16 md:pb-28 text-center">
                <div data-reveal>
                    <p className="text-zinc-400 mb-8 text-base md:text-lg max-w-xl mx-auto">
                        Need something we haven&apos;t built yet? We build custom platforms on the same stack.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <MagneticLink href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-zinc-100 text-black font-medium hover:bg-white">
                            Get in touch
                        </MagneticLink>
                        <MagneticLink href="/about" className="glass inline-flex items-center justify-center px-8 py-4 rounded-full font-medium">
                            About our team
                        </MagneticLink>
                    </div>
                </div>
            </section>
        </GlassPage>
    );
}
