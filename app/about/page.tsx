'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gradient-to-b from-black via-black/95 to-black pointer-events-none" />

            {/* Top Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 bg-black/80 backdrop-blur-md border-b border-white/10">
                <Link href="/" className="relative z-20">
                    <Image
                        src="/stdiox.png"
                        alt="StdioX Labs"
                        width={150}
                        height={60}
                        className="w-28 sm:w-32 md:w-40 h-auto invert brightness-0 drop-shadow-lg hover:scale-105 transition-transform duration-300"
                        priority
                    />
                </Link>
                <Link
                    href="/"
                    className="px-4 py-2 border border-white/30 hover:border-white rounded-full text-sm backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                >
                    Back to Home
                </Link>
            </nav>

            {/* Main Content */}
            <main className="relative pt-24 pb-16 px-4 md:px-8 md:pt-32 md:pb-20">
                <div className="max-w-5xl mx-auto">
                    {/* Header Section */}
                    <div className={`mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h1
                            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
                            style={{ fontFamily: 'var(--font-orbitron)' }}
                        >
                            About Us
                        </h1>
                        <div className="w-32 h-1 bg-white mb-8" />
                        <p
                            className="text-xl md:text-2xl text-gray-400 leading-relaxed"
                            style={{ fontFamily: 'var(--font-orbitron)' }}
                        >
                            Built by engineers. Driven by purpose. Defined by impact.
                        </p>
                    </div>

                    {/* Origin Story */}
                    <section className={`mb-24 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2
                            className="text-3xl md:text-4xl font-semibold mb-6 text-white"
                            style={{ fontFamily: 'var(--font-orbitron)' }}
                        >
                            Engineering First
                        </h2>
                        <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                            <p>
                                StdioX Labs was founded on a simple principle: <span className="text-white font-semibold">great technology solves real problems</span>.
                                We started in a room full of engineers who believed Africa's next chapter would be written in code.
                            </p>
                            <p>
                                Not by consultants theorizing about solutions. Not by copying what worked elsewhere.
                                But by engineers who understood the constraints, the opportunities, and the technical challenges unique to our continent.
                            </p>
                            <p className="text-white font-medium">
                                We built our first system from first principles. Then we built the next one better.
                            </p>
                        </div>
                    </section>

                    {/* Core Values Grid */}
                    <section className={`mb-24 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2
                            className="text-3xl md:text-4xl font-semibold mb-12 text-white"
                            style={{ fontFamily: 'var(--font-orbitron)' }}
                        >
                            How We Work
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-8 border border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                                <h3 className="text-xl font-semibold mb-4 text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                    Deep Technical Work
                                </h3>
                                <p className="text-gray-400">
                                    We don't build features. We build systems. Infrastructure that scales.
                                    Code that lasts. Architecture that matters.
                                </p>
                            </div>

                            <div className="p-8 border border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                                <h3 className="text-xl font-semibold mb-4 text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                    Context-Aware Solutions
                                </h3>
                                <p className="text-gray-400">
                                    Africa's infrastructure challenges are unique. Our solutions account for
                                    connectivity, cost, and real-world constraints.
                                </p>
                            </div>

                            <div className="p-8 border border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                                <h3 className="text-xl font-semibold mb-4 text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                    Open Collaboration
                                </h3>
                                <p className="text-gray-400">
                                    Great engineering happens in the open. We share knowledge, contribute to
                                    open source, and build with transparency.
                                </p>
                            </div>

                            <div className="p-8 border border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                                <h3 className="text-xl font-semibold mb-4 text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                    Long-Term Thinking
                                </h3>
                                <p className="text-gray-400">
                                    We optimize for decades, not quarters. The infrastructure we build today
                                    should serve Africa's next generation.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Mission Statement */}
                    <section className={`mb-24 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="p-12 border-l-4 border-white bg-white/5 backdrop-blur-sm">
                            <p
                                className="text-2xl md:text-3xl text-white leading-relaxed italic"
                                style={{ fontFamily: 'var(--font-orbitron)' }}
                            >
                                "We believe Africa's digital transformation will be built by those who
                                understand both the technology and the terrain. We are those engineers."
                            </p>
                        </div>
                    </section>

                    {/* Team Philosophy */}
                    <section className={`mb-24 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2
                            className="text-3xl md:text-4xl font-semibold mb-6 text-white"
                            style={{ fontFamily: 'var(--font-orbitron)' }}
                        >
                            Our Team
                        </h2>
                        <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                            <p>
                                Every member of StdioX Labs is an engineer first. We hire people who can
                                build, who can debug, who can architect systems that handle millions of transactions.
                            </p>
                            <p>
                                We're distributed across Africa—Lagos, Nairobi, Cairo, Cape Town, and beyond.
                                Different cities, one mission: <span className="text-white font-semibold">engineering Africa's digital infrastructure</span>.
                            </p>
                            <p className="text-white">
                                If you're an engineer who thinks in systems, who values craft, and who wants
                                to build technology that matters—we should talk.
                            </p>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className={`text-center transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2
                            className="text-2xl md:text-3xl font-semibold mb-8 text-white"
                            style={{ fontFamily: 'var(--font-orbitron)' }}
                        >
                            Join Us
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105"
                                style={{ fontFamily: 'var(--font-orbitron)' }}
                            >
                                Get in Touch
                            </Link>
                            <Link
                                href="/products"
                                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105"
                                style={{ fontFamily: 'var(--font-orbitron)' }}
                            >
                                See Our Work
                            </Link>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
