'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import ProductShowcase from '../components/ProductShowcase';
import { Eyebrow, GlassPage, PageHeader } from '../components/LiquidGlass';
import { buttonPrimary, buttonSecondary } from '../components/ui';
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
                eyebrow="products"
                title="Our products"
                lead="Ticketing, payments, lending and messaging software, built and run by one team on one shared stack."
            >
                <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm" aria-label="Product areas">
                    {productCategories.map((category) => (
                        <a
                            key={category.id}
                            href={`#${category.id}`}
                            onClick={() => trackEvent('Category Clicked', { category: category.label, page: 'Products' })}
                            className="text-zinc-300 underline decoration-white/20 underline-offset-[6px] hover:text-white hover:decoration-brand transition-colors"
                        >
                            {category.label}
                        </a>
                    ))}
                </nav>
            </PageHeader>

            {productCategories.map((category) => (
                <section key={category.id} id={category.id} className="px-4 md:px-8 py-12 md:py-20 scroll-mt-24">
                    <div className="max-w-7xl mx-auto">
                        <div data-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 lg:items-end mb-8 md:mb-12">
                            <div className="lg:col-span-7">
                                <Eyebrow>{category.label.split(' ')[0].toLowerCase()}</Eyebrow>
                                <h2 className="text-[2rem] sm:text-[2.75rem] lg:text-5xl font-medium tracking-[-0.03em] leading-[1.05]">
                                    {category.label}
                                </h2>
                            </div>
                            <p className="lg:col-span-5 text-zinc-400 text-base md:text-lg leading-relaxed">{category.summary}</p>
                        </div>
                        <div className="space-y-5">
                            {category.products.map((product, index) => (
                                <ProductShowcase key={product.id} product={product} reverse={index % 2 === 1} page="Products" />
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            <section className="px-4 md:px-8 pb-16 md:pb-28">
                <div data-reveal className="max-w-7xl mx-auto border-t border-white/10 pt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <p className="text-zinc-300 text-lg max-w-xl">
                        Need something we haven&apos;t built yet? We build custom platforms for partners on the same stack.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/contact" className={buttonPrimary}>
                            Get in touch
                        </Link>
                        <Link href="/about" className={buttonSecondary}>
                            About us
                        </Link>
                    </div>
                </div>
            </section>
        </GlassPage>
    );
}
