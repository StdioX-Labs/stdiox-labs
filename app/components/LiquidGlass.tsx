'use client';

import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react';
import Link from 'next/link';

const blobs = [
    {
        className: 'w-[max(55vw,420px)] h-[max(55vw,420px)] -top-[12vw] -left-[12vw]',
        background: 'radial-gradient(circle at 35% 30%, #fafafa 0%, #a1a1aa 22%, #3f3f46 52%, transparent 70%)',
        duration: '26s',
        delay: '0s',
    },
    {
        className: 'w-[max(46vw,360px)] h-[max(46vw,360px)] top-[18vh] -right-[14vw]',
        background: 'radial-gradient(circle at 60% 40%, #e4e4e7 0%, #71717a 28%, #27272a 58%, transparent 72%)',
        duration: '30s',
        delay: '-9s',
    },
    {
        className: 'w-[max(38vw,300px)] h-[max(38vw,300px)] -bottom-[12vw] left-[28vw]',
        background: 'radial-gradient(circle at 45% 55%, #d4d4d8 0%, #52525b 30%, #18181b 60%, transparent 72%)',
        duration: '34s',
        delay: '-17s',
    },
];

/**
 * Fixed graphite backdrop with slowly morphing chrome shapes for the glass panels to blur.
 * Also drives the pointer highlight on `.glass` elements and the `[data-reveal]` scroll animations.
 */
export function LiquidScene() {
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let frame = 0;
        let pointerX = window.innerWidth / 2;
        let pointerY = window.innerHeight / 2;

        const update = () => {
            frame = 0;
            sceneRef.current?.style.setProperty('--px', `${pointerX / window.innerWidth - 0.5}`);
            sceneRef.current?.style.setProperty('--py', `${pointerY / window.innerHeight - 0.5}`);
            document.querySelectorAll<HTMLElement>('.glass').forEach((element) => {
                const rect = element.getBoundingClientRect();
                if (rect.bottom < 0 || rect.top > window.innerHeight) return;
                element.style.setProperty('--mx', `${pointerX - rect.left}px`);
                element.style.setProperty('--my', `${pointerY - rect.top}px`);
            });
        };

        const handleMove = (event: globalThis.PointerEvent) => {
            pointerX = event.clientX;
            pointerY = event.clientY;
            if (!frame) frame = requestAnimationFrame(update);
        };

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

        window.addEventListener('pointermove', handleMove, { passive: true });
        return () => {
            window.removeEventListener('pointermove', handleMove);
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <div ref={sceneRef} aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden bg-[#0b0b0d] pointer-events-none">
            <div
                className="absolute inset-0 transition-transform duration-[2000ms] ease-out"
                style={{ transform: 'translate3d(calc(var(--px, 0) * -40px), calc(var(--py, 0) * -40px), 0)' }}
            >
                {blobs.map((blob) => (
                    <div
                        key={blob.duration}
                        className={`absolute blur-2xl opacity-60 animate-morph ${blob.className}`}
                        style={{ background: blob.background, animationDuration: blob.duration, animationDelay: blob.delay }}
                    />
                ))}
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.75)_100%)]" />
            <div className="absolute inset-0 grain opacity-[0.08] mix-blend-overlay" />
        </div>
    );
}

interface MagneticLinkProps {
    href: string;
    className: string;
    children: ReactNode;
    onClick?: () => void;
}

/** A link that leans toward the cursor while hovered. */
export function MagneticLink({ href, className, children, onClick }: MagneticLinkProps) {
    const handleMove = (event: PointerEvent<HTMLAnchorElement>) => {
        if (event.pointerType !== 'mouse') return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.25;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.35;
        event.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
    };

    const handleLeave = (event: PointerEvent<HTMLAnchorElement>) => {
        event.currentTarget.style.transform = '';
    };

    return (
        <Link
            href={href}
            onClick={onClick}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
            className={`transition-[transform,background-color,color] duration-300 ease-out ${className}`}
        >
            {children}
        </Link>
    );
}
