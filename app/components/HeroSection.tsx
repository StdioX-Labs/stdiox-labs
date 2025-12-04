'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [typedText, setTypedText] = useState('');
    const fullText = 'StdioX Labs';

    useEffect(() => {
        setIsVisible(true);

        let currentIndex = 0;
        let isDeleting = false;

        const typeLoop = () => {
            if (!isDeleting && currentIndex <= fullText.length) {
                // Typing forward
                setTypedText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else if (!isDeleting && currentIndex > fullText.length) {
                // Pause at the end before deleting
                setTimeout(() => {
                    isDeleting = true;
                }, 2000);
            } else if (isDeleting && currentIndex > 0) {
                // Deleting backward
                currentIndex--;
                setTypedText(fullText.slice(0, currentIndex));
            } else if (isDeleting && currentIndex === 0) {
                // Pause at the beginning before typing again
                isDeleting = false;
                setTimeout(() => {
                    currentIndex = 0;
                }, 500);
            }
        };

        const typingInterval = setInterval(typeLoop, isDeleting ? 75 : 150);

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <section className="relative flex min-h-screen items-center justify-center px-4 md:px-6 py-12 md:py-20">
            {/* Background overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 pointer-events-none" />

            {/* Top Left Logo */}
            <div className="absolute top-4 left-4 md:top-5 md:left-3 z-20">
                <Image
                    src="/stdiox.png"
                    alt="StdioX Labs"
                    width={150}
                    height={60}
                    className="w-28 sm:w-32 md:w-40 lg:w-48 h-auto invert brightness-0 drop-shadow-lg"
                    priority
                />
            </div>

            {/* Top Right Tab Navigation */}
            <div className="absolute top-0 right-0 z-20">
                <Link
                    href="/products"
                    className="group relative px-4 sm:px-6 md:px-8 pt-2.5 sm:pt-3 pb-3 sm:pb-4 bg-white/5 backdrop-blur-lg border-l-2 border-b-2 border-white/40 hover:bg-white/15 hover:border-white transition-all duration-300 shadow-lg hover:shadow-white/20 active:scale-95 cursor-pointer block"
                    style={{
                        fontFamily: 'var(--font-orbitron)',
                        clipPath: 'polygon(12px 0%, 100% 0%, 100% 100%, 0% 100%)',
                    }}
                >
                    <span className="relative z-10 text-white text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.25em] font-semibold uppercase drop-shadow-lg group-hover:tracking-[0.3em] transition-all duration-300">
                        Products
                    </span>
                    {/* Gradient overlay on hover */}
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ clipPath: 'polygon(12px 0%, 100% 0%, 100% 100%, 0% 100%)' }}
                    />
                    {/* Animated shine effect */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{ clipPath: 'polygon(12px 0%, 100% 0%, 100% 100%, 0% 100%)' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </div>
                </Link>
            </div>

            {/* Bottom Left - About Us Tab */}
            <div className="absolute bottom-0 left-0 z-20">
                <Link
                    href="/about"
                    className="group relative px-4 sm:px-6 md:px-8 pt-3 sm:pt-4 pb-2.5 sm:pb-3 bg-white/5 backdrop-blur-lg border-r-2 border-t-2 border-white/40 hover:bg-white/15 hover:border-white transition-all duration-300 shadow-lg hover:shadow-white/20 active:scale-95 cursor-pointer block"
                    style={{
                        fontFamily: 'var(--font-orbitron)',
                        clipPath: 'polygon(0% 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
                    }}
                >
                    <span className="relative z-10 text-white text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.25em] font-semibold uppercase drop-shadow-lg group-hover:tracking-[0.3em] transition-all duration-300">
                        About Us
                    </span>
                    <div
                        className="absolute inset-0 bg-gradient-to-tl from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ clipPath: 'polygon(0% 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)' }}
                    />
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{ clipPath: 'polygon(0% 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </div>
                </Link>
            </div>

            {/* Bottom Right - Contact Us Tab */}
            <div className="absolute bottom-0 right-0 z-20">
                <Link
                    href="/contact"
                    className="group relative px-4 sm:px-6 md:px-8 pt-3 sm:pt-4 pb-2.5 sm:pb-3 bg-white/5 backdrop-blur-lg border-l-2 border-t-2 border-white/40 hover:bg-white/15 hover:border-white transition-all duration-300 shadow-lg hover:shadow-white/20 active:scale-95 cursor-pointer block"
                    style={{
                        fontFamily: 'var(--font-orbitron)',
                        clipPath: 'polygon(12px 0%, 100% 0%, 100% 100%, 0% 100%)',
                    }}
                >
                    <span className="relative z-10 text-white text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.25em] font-semibold uppercase drop-shadow-lg group-hover:tracking-[0.3em] transition-all duration-300">
                        Contact Us
                    </span>
                    <div
                        className="absolute inset-0 bg-gradient-to-tr from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ clipPath: 'polygon(12px 0%, 100% 0%, 100% 100%, 0% 100%)' }}
                    />
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{ clipPath: 'polygon(12px 0%, 100% 0%, 100% 100%, 0% 100%)' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </div>
                </Link>
            </div>
            <div className="relative max-w-5xl mx-auto text-center space-y-6 md:space-y-8 z-10">
                {/* Main Logo/Title with Typing Animation */}
                <h1
                    className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-wide md:tracking-wider text-white transition-all duration-1000 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                >
                    {typedText.split('').map((char, index) => (
                        <span
                            key={index}
                            className={char === 'X' ? 'text-gray-400' : ''}
                        >
                            {char}
                        </span>
                    ))}
                    <span className="animate-pulse">|</span>
                </h1>

                {/* Divider Line */}
                <div
                    className={`w-32 md:w-48 h-px bg-white mx-auto transition-all duration-1000 delay-[1800ms] shadow-lg ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                        }`}
                />

                {/* Vision & Engineering Focus */}
                <p
                    className={`text-sm md:text-base leading-relaxed text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-[2000ms] px-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                >
                    Engineering the digital infrastructure Africa needs.
                    <span className="block mt-3 text-gray-400 text-xs md:text-sm">
                        From first principles. Built for scale. Designed for impact.
                    </span>
                </p>
            </div>
        </section>
    );
}
