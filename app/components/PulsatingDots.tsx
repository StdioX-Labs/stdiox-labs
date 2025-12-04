'use client';

import { useEffect, useRef } from 'react';

interface Dot {
    x: number;
    y: number;
    baseSize: number;
    phase: number;
}

export default function PulsatingDots() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const dotsRef = useRef<Dot[]>([]);
    const animationRef = useRef<number | undefined>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);

            // Initialize mouse at center for mobile (constant X)
            const isMobile = window.innerWidth < 768;
            if (isMobile) {
                mouseRef.current = {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                };
            }

            initDots();
        };

        const initDots = () => {
            const dots: Dot[] = [];
            // Keep circles packed on mobile
            const isMobile = window.innerWidth < 768;
            const spacing = 60; // Same tight spacing for all devices
            const cols = Math.ceil(window.innerWidth / spacing);
            const rows = Math.ceil(window.innerHeight / spacing);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    dots.push({
                        x: i * spacing + spacing / 2,
                        y: j * spacing + spacing / 2,
                        baseSize: isMobile ? 22 : 25,
                        phase: Math.random() * Math.PI * 2,
                    });
                }
            }
            dotsRef.current = dots;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        };

        const animate = () => {
            const dpr = window.devicePixelRatio || 1;
            ctx.clearRect(0, 0, window.innerWidth * dpr, window.innerHeight * dpr);
            const time = Date.now() * 0.001;

            // Mouse position as center for X shape
            const isMobile = window.innerWidth < 768;
            const centerX = isMobile ? window.innerWidth / 2 : mouseRef.current.x;
            const centerY = isMobile ? window.innerHeight / 2 : mouseRef.current.y;

            dotsRef.current.forEach((dot) => {
                const dx = centerX - dot.x;
                const dy = centerY - dot.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = isMobile ? 250 : 300;

                // Calculate distance from dot to the X shape diagonals centered at mouse
                const dotDx = dot.x - centerX;
                const dotDy = dot.y - centerY;

                // Distance to the two diagonal lines forming an X at mouse position
                const distToDiag1 = Math.abs(dotDy - dotDx) / Math.sqrt(2);
                const distToDiag2 = Math.abs(dotDy + dotDx) / Math.sqrt(2);
                const distToX = Math.min(distToDiag1, distToDiag2);

                // X shape influence (adjusted for mobile)
                const xThickness = isMobile ? 30 : 40;
                const isOnX = distToX < xThickness && distance < maxDistance;
                const xInfluence = isOnX ? (1 - distToX / xThickness) * (1 - distance / maxDistance) : 0;

                // Calculate size based on distance to mouse
                let sizeMultiplier = 1;
                let opacity = 0.2;

                if (distance < maxDistance) {
                    const influence = 1 - distance / maxDistance;
                    sizeMultiplier = 1 + influence * 0.8;
                    opacity = 0.2 + influence * 0.6;
                }

                // Add X shape boost
                if (isOnX) {
                    sizeMultiplier += xInfluence * 0.6;
                    opacity = Math.max(opacity, 0.3 + xInfluence * 0.5);
                }

                // Pulsating effect - enhanced on X shape
                let pulse = 1;
                if (distance < maxDistance) {
                    const influence = 1 - distance / maxDistance;
                    const xBoost = isOnX ? xInfluence * 0.5 : 0;
                    pulse = 1 + Math.sin(time * 2 + dot.phase) * (0.08 + xBoost) * influence;
                }

                const size = dot.baseSize * sizeMultiplier * pulse;

                // Black and white gradient - brighter on X
                const brightness = distance < maxDistance ? (1 - distance / maxDistance) + xInfluence * 0.3 : 0;

                ctx.save();

                // Draw crisp circles with sharp edges
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);

                // Create sharper gradient with less blur
                const gradient = ctx.createRadialGradient(
                    dot.x, dot.y, 0,
                    dot.x, dot.y, size
                );

                const centerBrightness = Math.floor(200 + brightness * 55);
                const edgeBrightness = Math.floor(140 + brightness * 40);

                gradient.addColorStop(0, `rgba(${centerBrightness}, ${centerBrightness}, ${centerBrightness}, ${opacity})`);
                gradient.addColorStop(0.6, `rgba(${edgeBrightness}, ${edgeBrightness}, ${edgeBrightness}, ${opacity * 0.8})`);
                gradient.addColorStop(0.85, `rgba(100, 100, 100, ${opacity * 0.3})`);
                gradient.addColorStop(1, `rgba(60, 60, 60, 0)`);

                ctx.fillStyle = gradient;
                ctx.fill();

                // Add single ring for definition when on X
                if (isOnX) {
                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, size * 0.8, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                }

                ctx.restore();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10"
            style={{
                background: '#000000',
                imageRendering: 'crisp-edges'
            }}
        />
    );
}
