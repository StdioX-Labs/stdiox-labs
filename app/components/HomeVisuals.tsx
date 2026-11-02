'use client';

import { useEffect, useRef, useState } from 'react';

// Illustrations for the home page. Every figure shown is sample data, not a live metric.

const GRID = 25;
const ARM_WIDTH = 0.2;

/** The StdioX X as a halftone dot matrix: it ripples, catches a moving chrome sheen and swells around the cursor. */
export function DotMatrixX({ className = '' }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const pointer = { x: 0, y: 0, active: false };
        let size = 0;
        let frame = 0;
        let visible = true;

        const draw = (time: number) => {
            const t = time / 1000;
            const step = size / GRID;
            const maxRadius = step * 0.46;
            const sheen = Math.sin(t * 0.45) * 1.4;
            ctx.clearRect(0, 0, size, size);

            for (let i = 0; i < GRID; i++) {
                for (let j = 0; j < GRID; j++) {
                    const u = ((i + 0.5) / GRID) * 2 - 1;
                    const v = ((j + 0.5) / GRID) * 2 - 1;
                    const x = (i + 0.5) * step;
                    const y = (j + 0.5) * step;

                    // Distance to the nearest diagonal of the X.
                    const armDistance = Math.min(Math.abs(u - v), Math.abs(u + v)) / Math.SQRT2;
                    const inside = Math.max(Math.abs(u), Math.abs(v)) < 0.96;
                    const strength = inside ? Math.max(0, 1 - armDistance / ARM_WIDTH) : 0;

                    const dx = x - pointer.x;
                    const dy = y - pointer.y;
                    const distance = Math.hypot(dx, dy) || 1;
                    const influence = pointer.active ? Math.max(0, 1 - distance / (size * 0.24)) : 0;

                    const ripple = reduceMotion ? 1 : 0.8 + 0.2 * Math.sin(t * 1.6 - (Math.abs(u) + Math.abs(v)) * 4);
                    let radius = strength > 0 ? maxRadius * (0.3 + 0.7 * Math.pow(strength, 0.7)) * ripple : 0;
                    let alpha = 1;
                    if (radius < 1) {
                        radius = 0.9 + influence * 1.8;
                        alpha = 0.14 + influence * 0.5;
                    }
                    radius *= 1 + influence * 0.5;

                    // Chrome shading: bright top-left, darker bottom-right, plus a sheen sweeping across.
                    const highlight = Math.exp(-Math.pow(u - v - sheen, 2) * 3) * 0.3;
                    const light = Math.min(1, 0.95 - ((u + v + 2) / 4) * 0.5 + highlight + influence * 0.2);
                    const shade = Math.round(255 * light);

                    const push = influence * step * 0.3;
                    ctx.fillStyle = `rgba(${shade}, ${shade}, ${Math.min(255, shade + 4)}, ${alpha})`;
                    ctx.beginPath();
                    ctx.arc(x + (dx / distance) * push, y + (dy / distance) * push, radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        const loop = (time: number) => {
            draw(time);
            frame = visible && !reduceMotion ? requestAnimationFrame(loop) : 0;
        };

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            size = canvas.clientWidth;
            canvas.width = size * dpr;
            canvas.height = size * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            draw(performance.now());
        };

        const handleMove = (event: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            pointer.x = event.clientX - rect.left;
            pointer.y = event.clientY - rect.top;
            pointer.active = true;
            if (reduceMotion) draw(performance.now());
        };

        const handleLeave = () => {
            pointer.active = false;
            if (reduceMotion) draw(performance.now());
        };

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);

        const visibilityObserver = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible && !frame && !reduceMotion) frame = requestAnimationFrame(loop);
        });
        visibilityObserver.observe(canvas);

        canvas.addEventListener('pointermove', handleMove);
        canvas.addEventListener('pointerleave', handleLeave);
        if (!reduceMotion) frame = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            visibilityObserver.disconnect();
            canvas.removeEventListener('pointermove', handleMove);
            canvas.removeEventListener('pointerleave', handleLeave);
        };
    }, []);

    return <canvas ref={canvasRef} aria-hidden="true" className={`block w-full aspect-square touch-pan-y ${className}`} />;
}

const activity = [
    { product: 'SoldOutAfrica', event: 'Ticket sold · VIP' },
    { product: 'Looker', event: 'Card approved · 41 ms' },
    { product: 'StdioX Comms', event: 'WhatsApp ticket delivered' },
    { product: 'Score', event: 'Loan approved · KES 25,000' },
    { product: 'StdioX Pay', event: 'Payment settled · USD 48' },
    { product: 'SoldOutAfrica', event: 'Gate scan · Gate B' },
    { product: 'Looker', event: '3-D Secure challenge' },
    { product: 'StdioX Bookings', event: 'Deposit received' },
];

const FEED_SIZE = 9;
const FEED_INTERVAL = 2400;

export function ActivityFeed() {
    const [items, setItems] = useState(() => Array.from({ length: FEED_SIZE }, (_, id) => ({ ...activity[id % activity.length], id })));

    useEffect(() => {
        let next = FEED_SIZE;
        const interval = setInterval(() => {
            const item = { ...activity[next % activity.length], id: next };
            next += 1;
            setItems((current) => [item, ...current.slice(0, FEED_SIZE - 1)]);
        }, FEED_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    return (
        <ul className="divide-y divide-white/[0.07]">
            {items.map((item, index) => (
                <li key={item.id} className={`flex items-center gap-3 py-3 ${index === 0 ? 'animate-feed-in' : ''}`}>
                    <span className="grid place-items-center w-8 h-8 shrink-0 rounded-full bg-white/10 text-[10px] font-medium text-zinc-200">
                        {item.product.replace('StdioX ', '').slice(0, 2)}
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm text-white truncate">{item.event}</p>
                        <p className="text-xs text-zinc-400 truncate">{item.product}</p>
                    </div>
                    <span className="text-xs text-zinc-500 tabular-nums shrink-0">
                        {index === 0 ? 'now' : `${Math.round((index * FEED_INTERVAL) / 1000)}s`}
                    </span>
                </li>
            ))}
        </ul>
    );
}

const bars = Array.from({ length: 32 }, (_, i) => 30 + ((i * 37) % 70));

export function TicketPulse() {
    const [sold, setSold] = useState(1284);

    useEffect(() => {
        const interval = setInterval(() => setSold((current) => current + 1 + (current % 3 === 0 ? 2 : 0)), 1300);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex h-full flex-col justify-end">
            <p className="mb-4 flex items-baseline gap-2">
                <span className="text-4xl font-semibold tracking-tight tabular-nums">{sold.toLocaleString('en-US')}</span>
                <span className="text-sm text-zinc-400">tickets sold tonight</span>
            </p>
            <div className="flex h-28 items-end gap-1">
                {bars.map((height, i) => (
                    <span
                        key={i}
                        className="flex-1 rounded-sm bg-gradient-to-t from-zinc-700 to-zinc-200 animate-bar"
                        style={{ height: `${height}%`, animationDelay: `${-i * 0.15}s` }}
                    />
                ))}
            </div>
        </div>
    );
}

export function CardScreen() {
    const [approved, setApproved] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setApproved((current) => !current), 2200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="relative w-full max-w-[240px] aspect-[1.586] overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/20 via-white/[0.06] to-white/[0.02] p-4">
                <div className="mb-6 h-6 w-8 rounded-md bg-gradient-to-br from-zinc-100 to-zinc-500" />
                <p className="font-mono text-sm tracking-widest text-zinc-100">•••• 4242</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-zinc-400">Visa · 3-D Secure</p>
                <span className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-scan" />
            </div>
            <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs transition-colors duration-500 ${approved ? 'bg-white text-black' : 'bg-white/10 text-zinc-300'}`}
            >
                <span className={`h-1.5 w-1.5 rounded-full ${approved ? 'bg-black' : 'bg-zinc-300 animate-pulse'}`} />
                {approved ? 'Approved · 41 ms' : 'Screening…'}
            </span>
        </div>
    );
}

export function ScoreGauge() {
    return (
        <div className="flex h-full items-center justify-center">
            <svg viewBox="0 0 200 124" className="w-full max-w-[240px]" role="img" aria-label="Sample credit score of 742">
                <defs>
                    <linearGradient id="gauge-stroke" x1="0" x2="1">
                        <stop offset="0" stopColor="#52525b" />
                        <stop offset="1" stopColor="#fafafa" />
                    </linearGradient>
                </defs>
                <path d="M 20 110 A 80 80 0 0 1 180 110" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" strokeLinecap="round" />
                <path
                    d="M 20 110 A 80 80 0 0 1 180 110"
                    pathLength={1}
                    className="gauge-fill"
                    fill="none"
                    stroke="url(#gauge-stroke)"
                    strokeWidth="12"
                    strokeLinecap="round"
                />
                <text x="100" y="98" textAnchor="middle" fill="#fff" fontSize="36" fontWeight="600">
                    742
                </text>
                <text x="100" y="120" textAnchor="middle" fill="#a1a1aa" fontSize="10">
                    Credit score · auto-approve
                </text>
            </svg>
        </div>
    );
}

const chatSteps = 6;

function TypingDots() {
    return (
        <span className="inline-flex gap-1 rounded-2xl bg-white/10 px-3 py-2.5">
            {[0, 1, 2].map((dot) => (
                <span key={dot} className="h-1.5 w-1.5 rounded-full bg-zinc-300 animate-typing" style={{ animationDelay: `${dot * 0.15}s` }} />
            ))}
        </span>
    );
}

export function ChatTyping() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setStep((current) => (current + 1) % chatSteps), 1300);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mx-auto flex h-full w-full max-w-md flex-col justify-end gap-2 text-sm">
            <div className="flex min-h-[38px]">
                {step === 0 ? (
                    <TypingDots />
                ) : (
                    <p className="animate-feed-in max-w-[80%] rounded-2xl rounded-bl-md bg-white/10 px-3.5 py-2 text-zinc-100">
                        Is my order for Saturday confirmed?
                    </p>
                )}
            </div>
            <div className="flex min-h-[38px] justify-end">
                {step === 2 && <TypingDots />}
                {step >= 3 && (
                    <p className="animate-feed-in max-w-[80%] rounded-2xl rounded-br-md bg-white px-3.5 py-2 text-black">
                        Yes — 2 VIP tickets. Sending them on WhatsApp now.
                    </p>
                )}
            </div>
            <div className="flex min-h-[26px] gap-2">
                {step >= 4 &&
                    ['SMS', 'Email', 'WhatsApp'].map((channel, i) => (
                        <span
                            key={channel}
                            className="animate-feed-in rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-zinc-300"
                            style={{ animationDelay: `${i * 120}ms` }}
                        >
                            ✓ {channel}
                        </span>
                    ))}
            </div>
        </div>
    );
}

interface StackLayer {
    name: string;
    items: string[];
}

/** Layered view of the shared stack, with data moving down between layers. */
export function StackDiagram({ layers }: { layers: StackLayer[] }) {
    return (
        <div>
            {layers.map((layer, index) => (
                <div key={layer.name}>
                    {index > 0 && (
                        <div className="relative mx-auto h-10 w-2/3" aria-hidden="true">
                            {[0, 1, 2].map((line) => (
                                <span key={line} className="absolute top-0 h-full w-px bg-white/15" style={{ left: `${line * 50}%` }}>
                                    <span
                                        className="absolute -left-[2px] top-0 h-[5px] w-[5px] rounded-full bg-white animate-flow"
                                        style={{ animationDelay: `${line * 0.4 + index * 0.3}s` }}
                                    />
                                </span>
                            ))}
                        </div>
                    )}
                    <div className="glass rounded-3xl p-5 md:p-6">
                        <p className="mb-3 text-xs text-zinc-400">{layer.name}</p>
                        <div className="flex flex-wrap gap-2">
                            {layer.items.map((item) => (
                                <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-zinc-200">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
