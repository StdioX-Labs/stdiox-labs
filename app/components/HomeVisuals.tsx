'use client';

import { useEffect, useRef } from 'react';

const GRID = 17;
const ARM_WIDTH = 0.17;

/**
 * The halftone X from the StdioX logo, drawn as glossy red dots that are largest at the centre.
 * It breathes slowly and the dots swell a little around the cursor.
 */
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
            const maxRadius = step * 0.47;
            ctx.clearRect(0, 0, size, size);

            for (let i = 0; i < GRID; i++) {
                for (let j = 0; j < GRID; j++) {
                    const u = ((i + 0.5) / GRID) * 2 - 1;
                    const v = ((j + 0.5) / GRID) * 2 - 1;
                    const armDistance = Math.min(Math.abs(u - v), Math.abs(u + v)) / Math.SQRT2;
                    if (armDistance > ARM_WIDTH) continue;

                    const x = (i + 0.5) * step;
                    const y = (j + 0.5) * step;
                    const fromCentre = Math.max(Math.abs(u), Math.abs(v));
                    const onArm = 1 - armDistance / ARM_WIDTH;

                    const dx = x - pointer.x;
                    const dy = y - pointer.y;
                    const influence = pointer.active ? Math.max(0, 1 - Math.hypot(dx, dy) / (size * 0.3)) : 0;
                    const breathe = reduceMotion ? 1 : 0.92 + 0.08 * Math.sin(t * 1.2 - fromCentre * 3);

                    const radius =
                        maxRadius * (0.35 + 0.65 * Math.pow(onArm, 0.5)) * (1 - fromCentre * 0.55) * breathe * (1 + influence * 0.35);
                    if (radius < 0.8) continue;

                    // Glossy sphere: light top-left, brand red, dark rim.
                    const gradient = ctx.createRadialGradient(x - radius * 0.35, y - radius * 0.4, radius * 0.1, x, y, radius);
                    gradient.addColorStop(0, '#ff8a8f');
                    gradient.addColorStop(0.45, '#e3262f');
                    gradient.addColorStop(1, '#7d0d13');
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, Math.PI * 2);
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

interface StackLayer {
    name: string;
    description: string;
    items: string[];
}

/** The shared stack as three layers, top to bottom. */
export function StackDiagram({ layers }: { layers: StackLayer[] }) {
    return (
        <ol className="glass rounded-3xl divide-y divide-white/[0.07]">
            {layers.map((layer) => (
                <li key={layer.name} className="grid gap-4 p-6 md:grid-cols-[180px_1fr] md:gap-8 md:p-8">
                    <div>
                        <p className="text-white font-medium">{layer.name}</p>
                        <p className="mt-1 text-sm text-zinc-500">{layer.description}</p>
                    </div>
                    <ul className="flex flex-wrap content-start gap-2">
                        {layer.items.map((item) => (
                            <li key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-zinc-300">
                                {item}
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ol>
    );
}
