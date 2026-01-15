'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { trackPageView, trackEvent } from '../utils/mixpanel';

export default function ContactPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    useEffect(() => {
        setIsVisible(true);
        trackPageView('Contact', {
            page_title: 'StdioX Labs - Contact',
            page_path: '/contact',
        });
    }, []);

    const handleContactClick = (method: string, value: string) => {
        trackEvent('Contact Method Clicked', {
            method: method,
            value: value,
            page: 'Contact',
        });
    };

    const contactMethods = [
        {
            id: 'email',
            icon: '✉',
            label: 'Email',
            value: 'info@stdiox.com',
            href: 'mailto:info@stdiox.com',
            description: 'Drop us a line anytime'
        },
        {
            id: 'phone',
            icon: '☎',
            label: 'Phone',
            value: '+254 715 066 651',
            href: 'tel:+254715066651',
            description: 'Brian - Direct Line',
            subtext: 'Available Mon-Fri, 9AM-6PM EAT'
        },
        {
            id: 'location',
            icon: '⚲',
            label: 'Location',
            value: 'Kentmere Valley',
            href: 'https://maps.google.com/?q=Kentmere+Valley+Kileleshwa+Nairobi',
            description: 'Kileleshwa, Nairobi',
            subtext: 'Kenya'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none" />

            {/* Top Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 bg-black/80 backdrop-blur-md border-b border-white/10">
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
            <main className="relative pt-24 pb-16 px-4 md:px-8 md:pt-32 md:pb-20">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className={`mb-20 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h1
                            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
                            style={{ fontFamily: 'var(--font-orbitron)' }}
                        >
                            Get in Touch
                        </h1>
                        <div className="w-32 h-1 bg-white mb-8 mx-auto" />
                        <p
                            className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto"
                            style={{ fontFamily: 'var(--font-orbitron)' }}
                        >
                            Let's build something exceptional together.
                        </p>
                    </div>

                    {/* Contact Cards */}
                    <div className={`grid md:grid-cols-3 gap-8 mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {contactMethods.map((method, index) => (
                            <a
                                key={method.id}
                                href={method.href}
                                target={method.id === 'location' ? '_blank' : undefined}
                                rel={method.id === 'location' ? 'noopener noreferrer' : undefined}
                                onMouseEnter={() => setHoveredCard(method.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                onClick={() => handleContactClick(method.label, method.value)}
                                className="group relative p-8 border-2 border-white/20 hover:border-white bg-white/5 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-white/10 cursor-pointer"
                                style={{
                                    transitionDelay: `${index * 100}ms`
                                }}
                            >
                                {/* Animated corner accents */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Icon */}
                                <div className="text-5xl mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                                    {method.icon}
                                </div>

                                {/* Label */}
                                <h3
                                    className="text-xl font-semibold mb-2 text-white"
                                    style={{ fontFamily: 'var(--font-orbitron)' }}
                                >
                                    {method.label}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-400 mb-4">
                                    {method.description}
                                </p>

                                {/* Value */}
                                <p
                                    className="text-lg text-white font-medium mb-2 group-hover:text-gray-200 transition-colors"
                                    style={{ fontFamily: 'var(--font-orbitron)' }}
                                >
                                    {method.value}
                                </p>

                                {/* Subtext */}
                                {method.subtext && (
                                    <p className="text-xs text-gray-500">
                                        {method.subtext}
                                    </p>
                                )}

                                {/* Hover indicator */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </a>
                        ))}
                    </div>

                    {/* Additional Information */}
                    <div className={`max-w-3xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="p-10 border border-white/20 bg-white/5 backdrop-blur-sm">
                            <h2
                                className="text-2xl md:text-3xl font-semibold mb-6 text-white text-center"
                                style={{ fontFamily: 'var(--font-orbitron)' }}
                            >
                                Ready to Start?
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-6 text-center">
                                Whether you're looking to build infrastructure, solve complex technical challenges,
                                or explore partnership opportunities—we're here to help.
                            </p>
                            <div className="space-y-4 text-gray-400 text-sm">
                                <div className="flex items-start gap-3">
                                    <span className="text-white text-lg">•</span>
                                    <p>
                                        <strong className="text-white">Technical Inquiries:</strong> Our engineering team
                                        responds to technical questions within 24 hours.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-white text-lg">•</span>
                                    <p>
                                        <strong className="text-white">Partnership Opportunities:</strong> Reach out to discuss
                                        collaboration and integration possibilities.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-white text-lg">•</span>
                                    <p>
                                        <strong className="text-white">Office Hours:</strong> Monday to Friday, 9:00 AM - 6:00 PM
                                        East Africa Time (EAT).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Callout */}
                    <div className={`mt-16 text-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <p className="text-gray-500 text-sm mb-6">
                            Operating from Nairobi, building for Africa
                        </p>
                        <div className="flex justify-center gap-6">
                            <Link
                                href="/about"
                                className="px-6 py-3 border border-white/30 hover:border-white text-white rounded-full text-sm backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer"
                                style={{ fontFamily: 'var(--font-orbitron)' }}
                            >
                                Learn About Us
                            </Link>
                            <Link
                                href="/products"
                                className="px-6 py-3 bg-white text-black rounded-full text-sm font-semibold hover:bg-gray-200 transition-all duration-300 cursor-pointer"
                                style={{ fontFamily: 'var(--font-orbitron)' }}
                            >
                                View Our Work
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
