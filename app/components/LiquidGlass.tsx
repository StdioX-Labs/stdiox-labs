'use client';

import { useEffect, type ReactNode } from 'react';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';

/**
 * Fixed graphite backdrop with two soft, still lights for the glass panels to blur.
 * Also runs the `[data-reveal]` fade-in as sections scroll into view.
 */
export function LiquidScene() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
        );
        document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
        return () => observer.disconnect();
    }, []);

    return (
        <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden bg-[#0b0b0d] pointer-events-none">
            <div className="absolute -top-[20vh] -left-[10vw] w-[70vw] h-[70vw] max-w-[1100px] max-h-[1100px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.09),transparent_65%)]" />
            <div className="absolute top-[40vh] -right-[15vw] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_65%)]" />
        </div>
    );
}

/** Shell for inner pages: backdrop, floating nav and footer. */
export function GlassPage({ children }: { children: ReactNode }) {
    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#0b0b0d] text-white">
            <LiquidScene />
            <div className="relative z-10">
                <SiteNav />
                <main>{children}</main>
                <SiteFooter />
            </div>
        </div>
    );
}

/** Small section label, letter-spaced in lowercase like the wordmark, with a red dot from the X. */
export function Eyebrow({ children }: { children: string }) {
    return (
        <p className="flex items-center gap-2.5 mb-5 text-xs lowercase tracking-[0.25em] text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            {children}
        </p>
    );
}

interface PageHeaderProps {
    eyebrow: string;
    title: string;
    lead: string;
    children?: ReactNode;
}

export function PageHeader({ eyebrow, title, lead, children }: PageHeaderProps) {
    return (
        <header className="px-4 md:px-8 pt-32 md:pt-44 pb-14 md:pb-20">
            <div className="max-w-7xl mx-auto animate-fade-up">
                <Eyebrow>{eyebrow}</Eyebrow>
                <h1 className="text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-[4rem] font-semibold tracking-[-0.03em] max-w-4xl mb-6">
                    {title}
                </h1>
                <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl">{lead}</p>
                {children && <div className="mt-10">{children}</div>}
            </div>
        </header>
    );
}
