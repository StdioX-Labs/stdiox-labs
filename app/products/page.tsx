'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { productCategories, statusLabels, type Product } from '../data/products';
import { trackPageView, trackEvent } from '../utils/mixpanel';

const statusStyles: Record<Product['status'], string> = {
    live: 'bg-green-500/20 border-green-500/50 text-green-400',
    enterprise: 'bg-white/10 border-white/40 text-white',
    'early-access': 'bg-amber-500/15 border-amber-500/40 text-amber-300',
};

export default function ProductsPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        trackPageView('Products', {
            page_title: 'StdioX Labs - Products',
            page_path: '/products',
        });
    }, []);

    const handleProductClick = (productName: string, productUrl: string | null) => {
        trackEvent('Product Clicked', {
            product_name: productName,
            product_url: productUrl,
            page: 'Products',
        });
    };

    const handleProductHover = (productName: string) => {
        trackEvent('Product Hovered', {
            product_name: productName,
            page: 'Products',
        });
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none" />

            <SiteNav />

            {/* Main Content */}
            <main className="relative pt-24 pb-16 px-4 md:px-8 md:pt-32 md:pb-20">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h1
                            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
                            style={{ fontFamily: 'var(--font-orbitron)' }}
                        >
                            Our Products
                        </h1>
                        <div className="w-32 h-1 bg-white mb-8 mx-auto" />
                        <p
                            className="text-lg md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto"
                            style={{ fontFamily: 'var(--font-orbitron)' }}
                        >
                            Ticketing, payments, lending and communications — one engineering team, one stack.
                        </p>
                    </div>

                    {/* Category Jump Links */}
                    <div className={`flex flex-wrap justify-center gap-3 mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {productCategories.map((category) => (
                            <a
                                key={category.id}
                                href={`#${category.id}`}
                                className="px-5 py-2 border border-white/30 hover:border-white rounded-full text-xs tracking-[0.15em] uppercase hover:bg-white/10 transition-all duration-300"
                                style={{ fontFamily: 'var(--font-orbitron)' }}
                            >
                                {category.label}
                            </a>
                        ))}
                    </div>

                    {/* Product Categories */}
                    <div className="space-y-24">
                        {productCategories.map((category) => (
                            <section key={category.id} id={category.id} className="scroll-mt-28">
                                <div className="mb-10 border-l-4 border-white pl-6">
                                    <h2
                                        className="text-2xl md:text-4xl font-semibold text-white mb-3"
                                        style={{ fontFamily: 'var(--font-orbitron)' }}
                                    >
                                        {category.label}
                                    </h2>
                                    <p className="text-gray-400 text-lg">{category.summary}</p>
                                </div>

                                <div className="grid gap-6 lg:grid-cols-3">
                                    {category.products.map((product) => (
                                        <article
                                            key={product.id}
                                            id={product.id}
                                            onMouseEnter={() => handleProductHover(product.name)}
                                            className="group relative flex flex-col p-8 border-2 border-white/20 hover:border-white bg-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 scroll-mt-28"
                                        >
                                            {/* Corner Accents */}
                                            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <h3
                                                    className="text-2xl md:text-3xl font-bold text-white"
                                                    style={{ fontFamily: 'var(--font-orbitron)' }}
                                                >
                                                    {product.name}
                                                </h3>
                                                <span className={`shrink-0 px-3 py-1 border text-[10px] font-semibold uppercase rounded-full ${statusStyles[product.status]}`}>
                                                    {statusLabels[product.status]}
                                                </span>
                                            </div>

                                            <p className="text-gray-400 mb-5" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                                {product.tagline}
                                            </p>

                                            <p className="text-gray-300 leading-relaxed mb-6">
                                                {product.description}
                                            </p>

                                            <ul className="space-y-2 mb-8">
                                                {product.features.map((feature) => (
                                                    <li key={feature} className="flex items-start gap-3 text-sm">
                                                        <span className="text-white">→</span>
                                                        <span className="text-gray-400">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="mt-auto">
                                                {product.url ? (
                                                    <a
                                                        href={product.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={() => handleProductClick(product.name, product.url)}
                                                        className="inline-flex items-center gap-3 text-white font-semibold group-hover:gap-5 transition-all duration-300"
                                                        style={{ fontFamily: 'var(--font-orbitron)' }}
                                                    >
                                                        Visit Platform <span className="text-xl">→</span>
                                                    </a>
                                                ) : (
                                                    <Link
                                                        href="/contact"
                                                        onClick={() => handleProductClick(product.name, null)}
                                                        className="inline-flex items-center gap-3 text-white font-semibold group-hover:gap-5 transition-all duration-300"
                                                        style={{ fontFamily: 'var(--font-orbitron)' }}
                                                    >
                                                        {product.status === 'early-access' ? 'Join Early Access' : 'Request a Demo'} <span className="text-xl">→</span>
                                                    </Link>
                                                )}
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Funding Callout */}
                    <Link
                        href="/funding"
                        onClick={() => handleProductClick('Event Prefinancing', '/funding')}
                        className="group block mt-24 p-8 md:p-12 border-2 border-white bg-white text-black transition-all duration-500 hover:scale-[1.01]"
                    >
                        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                            Funding
                        </p>
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                            <div>
                                <h2 className="text-2xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                    We prefinance events.
                                </h2>
                                <p className="text-gray-700 text-lg max-w-2xl">
                                    Venue deposits, artist advances and marketing — fronted from a dedicated capital pool and repaid automatically from ticket sales.
                                </p>
                            </div>
                            <span className="font-semibold whitespace-nowrap group-hover:translate-x-2 transition-transform" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                How it works →
                            </span>
                        </div>
                    </Link>

                    {/* Bottom CTA */}
                    <div className="mt-20 text-center">
                        <p className="text-gray-400 mb-8 text-lg">
                            Need something we haven&apos;t built yet? We build custom platforms too.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105 cursor-pointer"
                                style={{ fontFamily: 'var(--font-orbitron)' }}
                            >
                                Get in Touch
                            </Link>
                            <Link
                                href="/about"
                                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer"
                                style={{ fontFamily: 'var(--font-orbitron)' }}
                            >
                                About Our Team
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
