'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import ProductShowcase from '../components/ProductShowcase';
import { productCategories } from '../data/products';
import { trackPageView, trackEvent } from '../utils/mixpanel';

export default function ProductsPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        trackPageView('Products', {
            page_title: 'StdioX Labs - Products',
            page_path: '/products',
        });
    }, []);

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <SiteNav />

            {/* Header Section */}
            <header className="relative pt-36 pb-24 px-4 md:px-8 md:pt-44 overflow-hidden">
                <div className="absolute inset-0 bg-grid pointer-events-none" />
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl opacity-25 pointer-events-none bg-gradient-to-r from-violet-500 via-emerald-400 to-sky-500" />
                <div className={`relative max-w-5xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
                        The StdioX Stack
                    </p>
                    <h1
                        className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-tight"
                        style={{ fontFamily: 'var(--font-orbitron)' }}
                    >
                        Products that run{' '}
                        <span className="bg-gradient-to-r from-violet-400 via-emerald-300 to-sky-400 bg-clip-text text-transparent">
                            African business
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-12">
                        Ticketing, payments, lending and communications — built by one engineering team on one stack, and sold to the businesses that depend on them.
                    </p>

                    {/* Category Jump Links */}
                    <div className="grid sm:grid-cols-3 gap-4 text-left">
                        {productCategories.map((category) => (
                            <a
                                key={category.id}
                                href={`#${category.id}`}
                                onClick={() => trackEvent('Category Clicked', { category: category.label, page: 'Products' })}
                                className="group relative p-5 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.07] transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${category.accent[0]}, ${category.accent[1]})` }} />
                                <p className="font-semibold text-white mb-1" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                    {category.label}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {category.products.map((product) => product.name).join(' · ')}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            </header>

            {/* Product Categories */}
            <main className="relative">
                {productCategories.map((category) => (
                    <section key={category.id} id={category.id} className="relative px-4 md:px-8 py-24 md:py-32 border-t border-white/10 scroll-mt-20 overflow-hidden">
                        <div
                            className="absolute -right-40 top-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 pointer-events-none"
                            style={{ background: `linear-gradient(135deg, ${category.accent[0]}, ${category.accent[1]})` }}
                        />
                        <div className="relative max-w-7xl mx-auto">
                            <div className="mb-20 max-w-3xl">
                                <h2
                                    className="text-3xl md:text-6xl font-bold mb-5 bg-clip-text text-transparent"
                                    style={{ fontFamily: 'var(--font-orbitron)', backgroundImage: `linear-gradient(90deg, #fff, ${category.accent[0]})` }}
                                >
                                    {category.label}
                                </h2>
                                <p className="text-gray-400 text-lg md:text-xl">{category.summary}</p>
                            </div>
                            <div className="space-y-28 md:space-y-36">
                                {category.products.map((product, index) => (
                                    <ProductShowcase
                                        key={product.id}
                                        product={product}
                                        accent={category.accent}
                                        reverse={index % 2 === 1}
                                        page="Products"
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                ))}

                {/* Funding Callout */}
                <section className="px-4 md:px-8 pb-24">
                    <Link
                        href="/funding"
                        onClick={() => trackEvent('Product Clicked', { product_name: 'Event Prefinancing', product_url: '/funding', page: 'Products' })}
                        className="group relative block max-w-7xl mx-auto p-10 md:p-16 rounded-3xl overflow-hidden text-black transition-transform duration-500 hover:scale-[1.01] bg-gradient-to-br from-violet-400 via-fuchsia-300 to-amber-200"
                    >
                        <p className="text-xs tracking-[0.3em] uppercase mb-4 font-semibold" style={{ fontFamily: 'var(--font-orbitron)' }}>
                            Funding
                        </p>
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                    We prefinance events.
                                </h2>
                                <p className="text-black/70 text-lg max-w-2xl">
                                    Venue deposits, artist advances and marketing — fronted from a dedicated capital pool and repaid automatically from ticket sales.
                                </p>
                            </div>
                            <span className="font-semibold whitespace-nowrap group-hover:translate-x-2 transition-transform" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                How it works →
                            </span>
                        </div>
                    </Link>

                    {/* Bottom CTA */}
                    <div className="mt-24 text-center">
                        <p className="text-gray-400 mb-8 text-lg">
                            Need something we haven&apos;t built yet? We build custom platforms on the same stack.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105"
                                style={{ fontFamily: 'var(--font-orbitron)' }}
                            >
                                Get in Touch
                            </Link>
                            <Link
                                href="/about"
                                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105"
                                style={{ fontFamily: 'var(--font-orbitron)' }}
                            >
                                About Our Team
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
