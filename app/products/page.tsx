'use client';

import { useEffect } from 'react';
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
                                <h2 className="text-[2rem] sm:text-[2.75rem] lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.05]">
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

            {/* Bottom CTA */}
            <section className="px-4 md:px-8 pb-16 md:pb-28 text-center">
                <div data-reveal>
                    <p className="text-zinc-400 mb-8 text-base md:text-lg max-w-xl mx-auto">
                        Need something we haven&apos;t built yet? We build custom platforms on the same stack.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <MagneticLink href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-zinc-200">
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
