'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { DotField } from '../HomeVisuals';
import { Eyebrow } from '../LiquidGlass';
import { buttonPrimary, buttonSecondary } from '../ui';
import { trackEvent } from '../../utils/mixpanel';

const vertexShader = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

// The scene is the halftone X from the logo, drawn procedurally. Three metaballs form a blob of liquid glass
// that refracts the scene: it magnifies towards its centre, splits colour at its edges and catches a highlight.
const fragmentShader = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uDpr;
uniform vec2 uB0;
uniform vec2 uB1;
uniform vec2 uB2;
uniform vec2 uXC;
uniform float uXS;
uniform float uScale;

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float sdBox(vec2 p, vec2 b) { vec2 d = abs(p) - b; return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0); }

vec3 scene(vec2 px) {
    vec2 fromX = (px - uXC) / (uXS * 2.4);
    vec3 col = vec3(0.043, 0.043, 0.05) + 0.07 * exp(-dot(fromX, fromX));

    float cell = 20.0 * uDpr * mix(0.8, 1.0, uScale);
    vec2 centre = (floor(px / cell) + 0.5) * cell;
    vec2 local = px - centre;
    vec2 q = (centre - uXC) / uXS;

    float d = min(sdBox(rot(0.7854) * q, vec2(1.3, 0.17)), sdBox(rot(-0.7854) * q, vec2(1.3, 0.17)));
    float onArm = clamp(-d / 0.17, 0.0, 1.0);
    float edge = max(abs(q.x), abs(q.y));
    float breathe = 0.92 + 0.08 * sin(uTime * 1.2 - edge * 3.0);
    float r = step(d, 0.0) * cell * 0.47 * (0.35 + 0.65 * sqrt(onArm)) * (1.0 - 0.5 * clamp(edge, 0.0, 1.0)) * breathe;

    float tiny = cell * 0.07;
    float radius = max(r, tiny);
    float mask = smoothstep(radius, radius - 1.2 * uDpr, length(local));

    vec3 ink;
    if (r > tiny) {
        float light = clamp(1.0 - length(local / radius - vec2(-0.35, 0.4)) / 1.3, 0.0, 1.0);
        ink = mix(vec3(0.45, 0.04, 0.06), vec3(0.89, 0.15, 0.18), smoothstep(0.0, 0.6, light));
        ink = mix(ink, vec3(1.0, 0.62, 0.64), smoothstep(0.78, 1.0, light));
    } else {
        ink = vec3(0.14, 0.14, 0.16);
    }
    return mix(col, ink, mask);
}

void main() {
    vec2 px = gl_FragCoord.xy;
    float r0 = 130.0 * uDpr * uScale;
    float r1 = 85.0 * uDpr * uScale;
    float r2 = 100.0 * uDpr * uScale;
    vec2 d0 = px - uB0;
    vec2 d1 = px - uB1;
    vec2 d2 = px - uB2;
    float q0 = dot(d0, d0) + 1.0;
    float q1 = dot(d1, d1) + 1.0;
    float q2 = dot(d2, d2) + 1.0;
    float field = r0 * r0 / q0 + r1 * r1 / q1 + r2 * r2 / q2;
    vec2 gradient = -2.0 * (r0 * r0 * d0 / (q0 * q0) + r1 * r1 * d1 / (q1 * q1) + r2 * r2 * d2 / (q2 * q2));

    vec3 col;
    if (field > 1.0) {
        vec2 n = normalize(gradient + 1e-6);
        // The middle of the glass magnifies around the blobs' weighted centre; only the rim bends light sideways.
        // Keeping the sideways bend to the rim avoids the unstable gradient direction near each blob's centre.
        float w0 = r0 * r0 / q0;
        float w1 = r1 * r1 / q1;
        float w2 = r2 * r2 / q2;
        vec2 centroid = (uB0 * w0 + uB1 * w1 + uB2 * w2) / (w0 + w1 + w2);
        float steep = clamp(length(gradient) * r0 * 0.6, 0.0, 1.0);
        float thin = (1.0 - smoothstep(1.0, 3.2, field)) * steep;
        vec2 uv = centroid + (px - centroid) * 0.8 + n * 30.0 * thin * uDpr;
        float split = 7.0 * uDpr * thin;
        col = vec3(scene(uv + n * split).r, scene(uv).g, scene(uv - n * split).b);
        col = mix(col, vec3(0.78, 0.8, 0.84), 0.07) * 1.06;

        float rim = smoothstep(1.0, 1.07, field) * (1.0 - smoothstep(1.07, 1.7, field));
        col += rim * 0.32;
        vec3 normal = normalize(vec3(-n * thin * 1.6, 1.0));
        vec3 light = normalize(vec3(-0.45, 0.65, 0.9));
        col += pow(max(dot(reflect(-light, normal), vec3(0.0, 0.0, 1.0)), 0.0), 36.0) * 0.55;
    } else {
        col = scene(px) * (1.0 - 0.35 * smoothstep(0.45, 1.0, field));
    }

    float grain = fract(sin(dot(px, vec2(12.9898, 78.233))) * 43758.5453);
    gl_FragColor = vec4(col + (grain - 0.5) * 0.015, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

/** Home hero: a WebGL blob of liquid glass that follows the cursor and refracts the halftone X from the logo. */
export default function GlassHero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fallbackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas?.getContext('webgl', { antialias: false });
        const vertex = gl && compile(gl, gl.VERTEX_SHADER, vertexShader);
        const fragment = gl && compile(gl, gl.FRAGMENT_SHADER, fragmentShader);
        const program = gl?.createProgram();
        if (!canvas || !gl || !vertex || !fragment || !program) {
            if (fallbackRef.current) fallbackRef.current.hidden = false;
            return;
        }
        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.linkProgram(program);
        gl.useProgram(program);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

        const uniform = (name: string) => gl.getUniformLocation(program, name);
        const u = {
            res: uniform('uRes'), time: uniform('uTime'), dpr: uniform('uDpr'),
            b0: uniform('uB0'), b1: uniform('uB1'), b2: uniform('uB2'), xc: uniform('uXC'), xs: uniform('uXS'), scale: uniform('uScale'),
        };

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const pointer = { x: 0, y: 0, active: false };
        const blobs = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
        let dpr = 1;
        let width = 0;
        let height = 0;
        let frame = 0;
        let visible = true;

        // Where the X sits: right of the copy on large screens, under it on small ones.
        const layout = () => {
            const wide = width >= 1024;
            return {
                x: (wide ? 0.72 : 0.5) * width,
                y: (wide ? 0.5 : 0.19) * height,
                size: wide ? Math.min(width * 0.2, height * 0.34) : width * 0.27,
            };
        };

        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            width = canvas.clientWidth;
            height = canvas.clientHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            gl.viewport(0, 0, canvas.width, canvas.height);
            const x = layout();
            blobs.forEach((blob) => Object.assign(blob, { x: x.x, y: x.y }));
        };

        const render = (time: number) => {
            const t = time / 1000;
            const x = layout();
            const spread = Math.min(1, Math.max(0.5, width / 1280));
            // With no cursor, the glass drifts slowly around the X.
            const target = pointer.active
                ? { x: pointer.x, y: pointer.y }
                : { x: x.x + Math.cos(t * 0.35) * x.size * 0.9, y: x.y + Math.sin(t * 0.5) * x.size * (width >= 1024 ? 0.5 : 0.2) };
            blobs[0].x += (target.x - blobs[0].x) * 0.08;
            blobs[0].y += (target.y - blobs[0].y) * 0.08;
            blobs[1].x += (blobs[0].x + Math.cos(t * 1.1) * 70 * spread - blobs[1].x) * 0.05;
            blobs[1].y += (blobs[0].y + Math.sin(t * 1.3) * 60 * spread - blobs[1].y) * 0.05;
            blobs[2].x += (blobs[0].x - Math.cos(t * 0.8) * 90 * spread - blobs[2].x) * 0.035;
            blobs[2].y += (blobs[0].y - Math.sin(t * 0.9) * 70 * spread - blobs[2].y) * 0.035;

            // Uniforms are in device pixels with y pointing up, as gl_FragCoord is.
            const toGl = (point: { x: number; y: number }): [number, number] => [point.x * dpr, (height - point.y) * dpr];
            gl.uniform2f(u.res, canvas.width, canvas.height);
            gl.uniform1f(u.time, reduceMotion ? 0 : t);
            gl.uniform1f(u.dpr, dpr);
            gl.uniform2f(u.b0, ...toGl(blobs[0]));
            gl.uniform2f(u.b1, ...toGl(blobs[1]));
            gl.uniform2f(u.b2, ...toGl(blobs[2]));
            gl.uniform2f(u.xc, ...toGl(x));
            gl.uniform1f(u.xs, x.size * dpr);
            gl.uniform1f(u.scale, Math.min(1, Math.max(0.5, width / 1280)));
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        };

        const loop = (time: number) => {
            render(time);
            frame = visible && !reduceMotion ? requestAnimationFrame(loop) : 0;
        };

        const handleMove = (event: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            pointer.x = event.clientX - rect.left;
            pointer.y = event.clientY - rect.top;
            pointer.active = pointer.y >= 0 && pointer.y <= rect.height;
            if (reduceMotion) render(performance.now());
        };

        const resizeObserver = new ResizeObserver(() => {
            resize();
            render(performance.now());
        });
        resizeObserver.observe(canvas);
        const visibilityObserver = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible && !frame && !reduceMotion) frame = requestAnimationFrame(loop);
        });
        visibilityObserver.observe(canvas);
        window.addEventListener('pointermove', handleMove, { passive: true });
        if (!reduceMotion) frame = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            visibilityObserver.disconnect();
            window.removeEventListener('pointermove', handleMove);
        };
    }, []);

    const handleNavigationClick = (destination: string) => {
        trackEvent('Navigation Clicked', {
            destination: destination,
            from_page: 'Home',
            location: 'Hero Section',
        });
    };

    return (
        <section className="relative h-[100svh] min-h-[640px] overflow-hidden text-white">
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
            <div ref={fallbackRef} hidden className="absolute inset-0 grid place-items-center lg:pl-[40%]">
                <DotField shape="x" className="max-w-[420px]" />
            </div>

            <div className="relative z-10 flex h-full max-w-7xl mx-auto px-4 md:px-8 items-end lg:items-center pb-14 lg:pb-0 pointer-events-none">
                <div className="max-w-xl lg:max-w-2xl pointer-events-auto">
                    <Eyebrow>stdiox labs · nairobi</Eyebrow>
                    <h1 className="text-[2.75rem] sm:text-6xl lg:text-[5rem] font-medium leading-[0.98] tracking-[-0.045em] mb-7">
                        We build and run software for businesses in Africa.
                    </h1>
                    <p className="text-lg text-zinc-400 leading-relaxed max-w-lg mb-10">
                        Ticketing, payments, fraud screening, lending and customer messaging, starting with SoldOutAfrica.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/products" onClick={() => handleNavigationClick('Products')} className={buttonPrimary}>
                            See our products
                        </Link>
                        <Link href="/contact" onClick={() => handleNavigationClick('Contact')} className={buttonSecondary}>
                            Book a demo
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
