'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductsPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const products = [
        {
            id: 'soldoutafrica',
            name: 'SoldOutAfrica',
            tagline: 'Premier Events Platform',
            description: "Africa's first premier events ticketing and merchandising platform. Empowering event organizers with world-class infrastructure for ticket sales, event management, and merchandise distribution.",
            url: 'https://soldoutafrica.com/',
            status: 'live',
            features: [
                'End-to-end ticketing infrastructure',
                'Integrated merchandise platform',
                'Real-time analytics dashboard',
                'Secure payment processing'
            ]
        },
        {
            id: 'product2',
            name: 'Project Nexus',
            tagline: 'Next-Gen Infrastructure',
            description: 'Revolutionary platform currently in development. Built to solve critical challenges in African digital infrastructure.',
            url: null,
            status: 'coming-soon',
            features: []
        },
        {
            id: 'product3',
            name: 'Project Atlas',
            tagline: 'Scale Without Limits',
            description: 'Advanced system architecture for enterprise-grade solutions. Engineering the future of scalable African technology.',
            url: null,
            status: 'coming-soon',
            features: []
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none" />

            {/* Top Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4">
                <Link href="/" className="relative z-20">
                    <Image
                        src="/stdiox.png"
                        alt="StdioX Labs"
                        width={150}
                        height={60}
                        className="w-28 sm:w-32 md:w-40 h-auto invert brightness-0 drop-shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                        priority
                    />
                </Link>
                <Link
                    href="/"
                    className="px-4 py-2 border border-white/30 hover:border-white rounded-full text-sm backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                >
                    Back to Home
                </Link>
            </nav>

            {/* Main Content */}
            <main className="relative pt-32 pb-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className={`mb-20 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h1
                            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
                            style={{ fontFamily: 'var(--font-orbitron)' }}
                        >
                            Our Products
                        </h1>
                        <div className="w-32 h-1 bg-white mb-8 mx-auto" />
                        <p
                            className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto"
                            style={{ fontFamily: 'var(--font-orbitron)' }}
                        >
                            Engineering solutions that power Africa's digital future.
                        </p>
                    </div>

                    {/* Products Grid */}
                    <div className="space-y-12">
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                            >
                                {product.status === 'live' ? (
                                    // Live Product - SoldOutAfrica
                                    <a
                                        href={product.url!}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onMouseEnter={() => setHoveredProduct(product.id)}
                                        onMouseLeave={() => setHoveredProduct(null)}
                                        className="group block relative p-8 md:p-12 border-2 border-white/30 hover:border-white bg-white/5 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:bg-white/10 cursor-pointer"
                                    >
                                        {/* Corner Accents */}
                                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <h2
                                                        className="text-3xl md:text-5xl font-bold text-white group-hover:text-gray-200 transition-colors"
                                                        style={{ fontFamily: 'var(--font-orbitron)' }}
                                                    >
                                                        {product.name}
                                                    </h2>
                                                    <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 text-green-400 text-xs font-semibold uppercase rounded-full">
                                                        Live
                                                    </span>
                                                </div>

                                                <p className="text-xl text-gray-400 mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                                    {product.tagline}
                                                </p>

                                                <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                                                    {product.description}
                                                </p>

                                                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                                    {product.features.map((feature, i) => (
                                                        <div key={i} className="flex items-start gap-3">
                                                            <span className="text-white text-xl mt-1">→</span>
                                                            <span className="text-gray-400">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex items-center gap-3 text-white group-hover:gap-5 transition-all duration-300">
                                                    <span style={{ fontFamily: 'var(--font-orbitron)' }} className="font-semibold">
                                                        Visit Platform
                                                    </span>
                                                    <span className="text-2xl">→</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    </a>
                                ) : (
                                    // Coming Soon Products - Blurred
                                    <div
                                        className="relative p-8 md:p-12 border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
                                        style={{ filter: 'blur(1px)' }}
                                    >
                                        {/* Heavy blur overlay */}
                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-xl z-10" />

                                        <div className="relative z-0 opacity-30">
                                            <div className="flex items-center gap-4 mb-4">
                                                <h2
                                                    className="text-3xl md:text-5xl font-bold text-white"
                                                    style={{ fontFamily: 'var(--font-orbitron)' }}
                                                >
                                                    {product.name}
                                                </h2>
                                            </div>

                                            <p className="text-xl text-gray-400 mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                                {product.tagline}
                                            </p>

                                            <p className="text-gray-300 leading-relaxed text-lg">
                                                {product.description}
                                            </p>
                                        </div>

                                        {/* Coming Soon Badge */}
                                        <div className="absolute inset-0 flex items-center justify-center z-20">
                                            <div className="text-center">
                                                <div
                                                    className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-clip-text text-transparent animate-pulse"
                                                    style={{ fontFamily: 'var(--font-orbitron)' }}
                                                >
                                                    COMING SOON
                                                </div>
                                                <div className="w-48 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className={`mt-20 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <p className="text-gray-400 mb-8 text-lg">
                            Want to build something together?
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
        </div>
    );
}
