'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '../data/navigation';
import { trackEvent } from '../utils/mixpanel';

export default function SiteNav() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const handleNavigationClick = (destination: string) => {
        setIsOpen(false);
        trackEvent('Navigation Clicked', {
            destination: destination,
            from_page: pathname,
            location: 'Top Navigation',
        });
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center justify-between px-4 md:px-8 py-4">
                <Link href="/" className="relative z-20" onClick={() => handleNavigationClick('Home')}>
                    <Image
                        src="/stdiox.png"
                        alt="StdioX Labs"
                        width={150}
                        height={60}
                        className="w-28 sm:w-32 md:w-40 h-auto invert brightness-0 drop-shadow-lg hover:scale-105 transition-transform duration-300"
                        priority
                    />
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-2" style={{ fontFamily: 'var(--font-orbitron)' }}>
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => handleNavigationClick(link.label)}
                                className={`px-4 py-2 rounded-full text-xs tracking-[0.2em] uppercase transition-all duration-300 ${isActive
                                    ? 'bg-white text-black font-semibold'
                                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile toggle */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden px-4 py-2 border border-white/30 rounded-full text-xs tracking-[0.2em] uppercase text-white cursor-pointer"
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation"
                >
                    {isOpen ? 'Close' : 'Menu'}
                </button>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden border-t border-white/10 px-4 pb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => handleNavigationClick(link.label)}
                            className={`block py-3 border-b border-white/10 text-sm tracking-[0.2em] uppercase ${pathname === link.href ? 'text-white' : 'text-gray-400'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
