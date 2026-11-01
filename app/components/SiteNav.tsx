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
        <nav className="fixed top-3 md:top-5 inset-x-0 z-50 px-3 md:px-6">
            <div className="glass mx-auto max-w-5xl rounded-[1.75rem] bg-black/30">
                <div className="flex items-center justify-between pl-5 pr-2 py-2">
                    <Link href="/" className="relative" onClick={() => handleNavigationClick('Home')}>
                        <Image
                            src="/stdiox.png"
                            alt="StdioX Labs"
                            width={150}
                            height={60}
                            className="w-24 md:w-28 h-auto invert brightness-0 hover:opacity-80 transition-opacity duration-300"
                            priority
                        />
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => handleNavigationClick(link.label)}
                                    className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${isActive
                                        ? 'bg-white text-black font-medium'
                                        : 'text-zinc-300 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                        <Link
                            href="/contact"
                            onClick={() => handleNavigationClick('Contact CTA')}
                            className="ml-2 px-5 py-2 rounded-full text-sm font-medium bg-zinc-100 text-black hover:bg-white transition-colors"
                        >
                            Book a demo
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden grid place-items-center w-10 h-10 rounded-full bg-white/10 text-white cursor-pointer"
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation"
                    >
                        <span className="relative block w-4 h-3">
                            <span className={`absolute left-0 w-4 h-px bg-current transition-all duration-300 ${isOpen ? 'top-1.5 rotate-45' : 'top-0'}`} />
                            <span className={`absolute left-0 w-4 h-px bg-current transition-all duration-300 ${isOpen ? 'top-1.5 -rotate-45' : 'top-3'}`} />
                        </span>
                    </button>
                </div>

                {/* Mobile menu */}
                <div className={`md:hidden grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                        <div className="px-5 pb-5 pt-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => handleNavigationClick(link.label)}
                                    className={`flex items-center justify-between py-3 border-b border-white/10 text-lg ${pathname === link.href ? 'text-white' : 'text-zinc-400'}`}
                                >
                                    {link.label}
                                    <span className="text-zinc-600">→</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
