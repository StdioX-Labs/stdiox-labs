'use client';

import { useEffect, useRef, type MutableRefObject } from 'react';

interface Dot {
    x: number;
    y: number;
    r: number;
    hot: boolean;
}

/** The halftone X from the StdioX logo, in a unit square: dots are largest at the centre. */
function buildX(): Dot[] {
    const grid = 17;
    const armWidth = 0.17;
    const dots: Dot[] = [];
    for (let i = 0; i < grid; i++) {
        for (let j = 0; j < grid; j++) {
            const u = ((i + 0.5) / grid) * 2 - 1;
            const v = ((j + 0.5) / grid) * 2 - 1;
            const armDistance = Math.min(Math.abs(u - v), Math.abs(u + v)) / Math.SQRT2;
            if (armDistance > armWidth) continue;
            const onArm = 1 - armDistance / armWidth;
            const fromCentre = Math.max(Math.abs(u), Math.abs(v));
            const r = (0.47 / grid) * (0.35 + 0.65 * Math.sqrt(onArm)) * (1 - fromCentre * 0.55);
            if (r * 600 < 1) continue;
            dots.push({ x: (i + 0.5) / grid, y: (j + 0.5) / grid, r, hot: true });
        }
    }
    return dots;
}

// Coastline of mainland Africa and Madagascar as [longitude, latitude], simplified.
const mainland: [number, number][] = [
    [-5.8, 35.8], [3, 36.8], [10.2, 37.2], [11, 33.5], [13.2, 32.9], [19, 30.3], [20, 32.1], [25, 31.6], [29.9, 31.2],
    [32.3, 31.3], [33.5, 27.5], [35.5, 24], [37.2, 19.5], [39.5, 15.5], [43.3, 11.6], [51.2, 11.8], [49, 6], [45.3, 2],
    [41, -2], [39.7, -4], [39.3, -6.8], [40.5, -10.5], [40.7, -15], [37, -17.5], [34.8, -19.8], [35.5, -22], [32.6, -26],
    [31, -29.9], [27.9, -33], [25.6, -34], [20, -34.8], [18.4, -34], [18.2, -32], [15, -27], [14.5, -22.5], [11.8, -17.3],
    [13.2, -8.8], [12.3, -6], [11.5, -4.5], [9, -1], [9.5, 2], [9.7, 4], [6, 4.3], [3.4, 6.4], [-0.2, 5.6], [-4, 5.2],
    [-7.7, 4.4], [-11.5, 6.9], [-13.2, 8.5], [-15, 10.8], [-17.4, 14.7], [-16, 19.5], [-17, 21], [-14.5, 26], [-13, 27.6],
    [-9.6, 30.4], [-7.6, 33.6],
];
const madagascar: [number, number][] = [
    [49, -12], [50.5, -15.5], [47, -25], [44, -24.5], [43.5, -21], [44.4, -16.2], [47.5, -14],
];
export const NAIROBI: [number, number] = [36.8, -1.3];

const LON_MIN = -18;
const LAT_MAX = 38;
const SPAN = 74;

const project = ([lon, lat]: [number, number]) => ({ x: (lon - LON_MIN) / SPAN, y: (LAT_MAX - lat) / SPAN });

function inside(point: [number, number], polygon: [number, number][]) {
    let result = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if (yi > point[1] !== yj > point[1] && point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi) + xi) result = !result;
    }
    return result;
}

/** A dotted map of Africa, echoing the SoldOutAfrica wordmark, with the dot nearest Nairobi lit. */
function buildAfrica(): Dot[] {
    const columns = 30;
    const step = SPAN / columns;
    const dots: Dot[] = [];
    for (let lon = LON_MIN + step / 2; lon < LON_MIN + SPAN; lon += step) {
        for (let lat = LAT_MAX - step / 2; lat > LAT_MAX - SPAN; lat -= step) {
            const point: [number, number] = [lon, lat];
            if (!inside(point, mainland) && !inside(point, madagascar)) continue;
            dots.push({ ...project(point), r: 0.34 / columns, hot: false });
        }
    }
    const nairobi = project(NAIROBI);
    let nearest = dots[0];
    for (const dot of dots) {
        if (Math.hypot(dot.x - nairobi.x, dot.y - nairobi.y) < Math.hypot(nearest.x - nairobi.x, nearest.y - nairobi.y)) nearest = dot;
    }
    nearest.hot = true;
    nearest.r *= 1.5;
    return dots;
}

// Sort both shapes the same way so each dot travels a short, readable path.
const byRow = (a: Dot, b: Dot) => a.y - b.y || a.x - b.x;
const SHAPES = { x: buildX().sort(byRow), africa: buildAfrica().sort(byRow) };

const RED: [number, number, number][] = [[255, 138, 143], [227, 38, 47], [125, 13, 19]];
const GRAY: [number, number, number][] = [[250, 250, 250], [161, 161, 170], [63, 63, 70]];

const mix = (a: [number, number, number], b: [number, number, number], t: number) =>
    `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)}, ${Math.round(a[1] + (b[1] - a[1]) * t)}, ${Math.round(a[2] + (b[2] - a[2]) * t)})`;
// Each dot is stamped from a small pre-rendered sphere rather than building a gradient per dot per frame.
// Tones between red (0) and gray (1) are rounded to a few steps so the cache stays small.
const SPRITE_SIZE = 64;
const TONE_STEPS = 8;
const sprites = new Map<number, HTMLCanvasElement>();

function sphereSprite(tone: number) {
    const step = Math.round(tone * TONE_STEPS);
    let sprite = sprites.get(step);
    if (!sprite) {
        const level = step / TONE_STEPS;
        sprite = document.createElement('canvas');
        sprite.width = sprite.height = SPRITE_SIZE;
        const context = sprite.getContext('2d');
        if (context) {
            const r = SPRITE_SIZE / 2;
            const gradient = context.createRadialGradient(r - r * 0.35, r - r * 0.4, r * 0.1, r, r, r);
            gradient.addColorStop(0, mix(RED[0], GRAY[0], level));
            gradient.addColorStop(0.45, mix(RED[1], GRAY[1], level));
            gradient.addColorStop(1, mix(RED[2], GRAY[2], level));
            context.fillStyle = gradient;
            context.beginPath();
            context.arc(r, r, r, 0, Math.PI * 2);
            context.fill();
        }
        sprites.set(step, sprite);
    }
    return sprite;
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (t: number) => Math.min(1, Math.max(0, t));

interface DotFieldProps {
    /** Draw a single shape, or omit and pass `progress` to morph from the X (0) to Africa (1). */
    shape?: keyof typeof SHAPES;
    progress?: MutableRefObject<number>;
    className?: string;
}

/**
 * Halftone dots drawn on a canvas. The X from the StdioX logo can morph, dot by dot, into a map of Africa
 * as the page scrolls. Dots swell slightly around the cursor and Nairobi pulses on the map.
 */
export function DotField({ shape, progress, className = '' }: DotFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const pointer = { x: 0, y: 0, active: false };
        const from = SHAPES[shape ?? 'x'];
        const to = SHAPES[shape ?? 'africa'];
        let size = 0;
        let frame = 0;
        let visible = true;

        const draw = (time: number) => {
            const t = time / 1000;
            const morph = shape ? 0 : clamp(progress?.current ?? 0);
            ctx.clearRect(0, 0, size, size);

            const count = Math.max(from.length, to.length);
            for (let i = 0; i < count; i++) {
                const a = from[i];
                const b = to[i];
                // Stagger the dots so the shape dissolves and regroups in a wave from top to bottom.
                const local = ease(clamp(morph * 1.6 - (i / count) * 0.6));
                const start = a ?? b;
                const end = b ?? a;
                const startRadius = a ? a.r : 0;
                const endRadius = b ? b.r : 0;

                const x = (start.x + (end.x - start.x) * local) * size;
                const y = (start.y + (end.y - start.y) * local) * size;
                const hot = local < 0.5 ? (a?.hot ?? false) : (b?.hot ?? false);
                const influence = pointer.active ? Math.max(0, 1 - Math.hypot(x - pointer.x, y - pointer.y) / (size * 0.25)) : 0;
                const breathe = reduceMotion ? 1 : 0.94 + 0.06 * Math.sin(t * 1.2 - (start.x + start.y) * 6);
                const radius = (startRadius + (endRadius - startRadius) * local) * size * breathe * (1 + influence * 0.4);
                if (radius < 0.6) continue;

                // Red when the dot belongs to the X (or is Nairobi), fading to gray as it joins the map.
                const tone = hot ? 0 : shape === 'africa' ? 1 : local;
                ctx.drawImage(sphereSprite(tone), x - radius, y - radius, radius * 2, radius * 2);
            }

            // Pulse and label on Nairobi once the map has formed.
            const mapShown = shape === 'africa' ? 1 : clamp((morph - 0.75) / 0.25);
            if (mapShown > 0) {
                const nairobi = project(NAIROBI);
                const nx = nairobi.x * size;
                const ny = nairobi.y * size;
                const pulse = reduceMotion ? 0.5 : (t % 2) / 2;
                ctx.strokeStyle = `rgba(227, 38, 47, ${(1 - pulse) * 0.8 * mapShown})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(nx, ny, size * (0.015 + pulse * 0.05), 0, Math.PI * 2);
                ctx.stroke();
                // Leader line out past the coast so the label doesn't sit on the dots.
                const labelX = nx + size * 0.1;
                ctx.strokeStyle = `rgba(244, 244, 245, ${0.5 * mapShown})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(nx + size * 0.02, ny);
                ctx.lineTo(labelX - size * 0.012, ny);
                ctx.stroke();
                ctx.fillStyle = `rgba(244, 244, 245, ${mapShown})`;
                ctx.font = `500 ${Math.max(12, size * 0.026)}px ${getComputedStyle(document.body).fontFamily}`;
                ctx.fillText('Nairobi', labelX, ny + size * 0.009);
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
        };
        const handleLeave = () => {
            pointer.active = false;
        };
        // Without the animation loop, redraw on scroll so the morph still follows the page.
        const handleScroll = () => {
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
        window.addEventListener('scroll', handleScroll, { passive: true });
        if (!reduceMotion) frame = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            visibilityObserver.disconnect();
            canvas.removeEventListener('pointermove', handleMove);
            canvas.removeEventListener('pointerleave', handleLeave);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [shape, progress]);

    return <canvas ref={canvasRef} aria-hidden="true" className={`block w-full aspect-square touch-pan-y ${className}`} />;
}

/** Four rack units drawn in dots, one status light pulsing red. */
export function RackDots() {
    return (
        <svg viewBox="0 0 200 150" className="w-full h-full" aria-hidden="true">
            {[22, 52, 82, 112].map((y, row) => (
                <g key={y}>
                    <rect x="20" y={y} width="160" height="20" rx="4" fill="none" stroke="#3f3f46" />
                    {Array.from({ length: 14 }, (_, i) => (
                        <circle key={i} cx={30 + i * 8} cy={y + 10} r="1.8" fill="#52525b" />
                    ))}
                    <circle cx="156" cy={y + 10} r="2.6" fill="#a1a1aa" />
                    <circle cx="166" cy={y + 10} r="2.6" fill={row === 1 ? '#e3262f' : '#a1a1aa'} className={row === 1 ? 'animate-pulse' : undefined} />
                </g>
            ))}
        </svg>
    );
}

const spike = [2, 2, 3, 2, 3, 3, 4, 3, 5, 9, 13, 14, 12, 7, 5, 4];

/** Ticket sales as stacked dots, spiking the moment an event goes on sale. */
export function SpikeDots() {
    return (
        <svg viewBox="0 0 200 150" className="w-full h-full" aria-hidden="true">
            {spike.map((height, column) =>
                Array.from({ length: height }, (_, row) => (
                    <circle
                        key={`${column}-${row}`}
                        cx={28 + column * 9.6}
                        cy={128 - row * 7.5}
                        r="2.6"
                        fill={row === height - 1 && height > 10 ? '#e3262f' : row > 8 ? '#d4d4d8' : '#71717a'}
                    />
                )),
            )}
            <line x1="20" x2="180" y1="136" y2="136" stroke="#3f3f46" />
        </svg>
    );
}

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

/** A feature-phone keypad dialling a USSD code. */
export function KeypadDots() {
    return (
        <svg viewBox="0 0 200 150" className="w-full h-full" aria-hidden="true">
            <text x="100" y="22" textAnchor="middle" fill="#f4f4f5" fontSize="13" fontFamily="var(--font-geist-mono), monospace" letterSpacing="2">
                *384#
            </text>
            {keys.map((key, index) => {
                const x = 70 + (index % 3) * 30;
                const y = 44 + Math.floor(index / 3) * 27;
                const pressed = key === '#';
                return (
                    <g key={key}>
                        <circle cx={x} cy={y} r="11" fill={pressed ? '#e3262f' : '#18181b'} stroke={pressed ? '#e3262f' : '#3f3f46'} />
                        <text x={x} y={y + 3.5} textAnchor="middle" fill={pressed ? '#fff' : '#a1a1aa'} fontSize="10">
                            {key}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}
