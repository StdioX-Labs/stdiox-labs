'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Eyebrow, GlassPage, PageHeader } from '../components/LiquidGlass';
import { buttonPrimary, buttonSecondary } from '../components/ui';
import { trackPageView } from '../utils/mixpanel';

const principles = [
    {
        title: 'Deep technical work',
        body: "We don't build features. We build systems: infrastructure that scales and code that lasts.",
    },
    {
        title: 'Context-aware solutions',
        body: "Africa's infrastructure challenges are unique. Our solutions account for connectivity, cost and real-world constraints.",
    },
    {
        title: 'Open collaboration',
        body: 'We share knowledge, contribute to open source and build with transparency.',
    },
    {
        title: 'Long-term thinking',
        body: "We optimise for decades, not quarters. What we build today should serve Africa's next generation.",
    },
];

const sectionHeading = 'text-[2rem] sm:text-[2.75rem] font-medium tracking-[-0.03em] leading-[1.05]';

export default function AboutPage() {
    useEffect(() => {
        trackPageView('About', {
            page_title: 'StdioX Labs - About Us',
            page_path: '/about',
        });
    }, []);

    return (
        <GlassPage>
            <PageHeader
                eyebrow="about"
                title="About StdioX Labs"
                lead="We're an engineering company in Nairobi. We build our own products, and we run them ourselves."
            />

            <div className="px-4 md:px-8 pb-16 md:pb-28">
                <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
                    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                        <div data-reveal className="lg:col-span-4">
                            <Eyebrow>origin</Eyebrow>
                            <h2 className={sectionHeading}>Engineering first</h2>
                        </div>
                        <div data-reveal className="lg:col-span-8 space-y-5 text-zinc-300 leading-relaxed text-base md:text-lg">
                            <p>
                                StdioX Labs was founded on a simple principle: great technology solves real problems. We started in a
                                room full of engineers who believed Africa&apos;s next chapter would be written in code.
                            </p>
                            <p>
                                Not by consultants theorising about solutions, and not by copying what worked elsewhere, but by
                                engineers who understood the constraints, the opportunities and the technical challenges of our
                                continent.
                            </p>
                            <p className="text-white">We built our first system from first principles. Then we built the next one better.</p>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                        <div data-reveal className="lg:col-span-4">
                            <Eyebrow>principles</Eyebrow>
                            <h2 className={sectionHeading}>How we work</h2>
                        </div>
                        <div data-reveal className="lg:col-span-8 glass rounded-3xl grid sm:grid-cols-2">
                            {principles.map((item, index) => (
                                <div
                                    key={item.title}
                                    className={`p-6 md:p-8 border-white/[0.07] ${index > 0 ? 'border-t' : ''} ${index === 1 ? 'sm:border-t-0' : ''} ${index % 2 === 1 ? 'sm:border-l' : ''}`}
                                >
                                    <h3 className="text-white font-medium mb-2">{item.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section data-reveal className="border-l-2 border-brand pl-6 md:pl-10 max-w-4xl">
                        <blockquote className="text-2xl md:text-4xl font-medium tracking-[-0.02em] leading-[1.25] text-white">
                            &ldquo;Africa&apos;s digital transformation will be built by those who understand both the technology and
                            the terrain. We are those engineers.&rdquo;
                        </blockquote>
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                        <div data-reveal className="lg:col-span-4">
                            <Eyebrow>team</Eyebrow>
                            <h2 className={sectionHeading}>Our team</h2>
                        </div>
                        <div data-reveal className="lg:col-span-8 space-y-5 text-zinc-300 leading-relaxed text-base md:text-lg">
                            <p>
                                Every member of StdioX Labs is an engineer first. We hire people who can build, debug and design
                                systems that handle millions of transactions.
                            </p>
                            <p>
                                We&apos;re distributed across Africa, in Lagos, Nairobi, Cairo, Cape Town and beyond. Different cities,
                                one mission: engineering Africa&apos;s digital infrastructure.
                            </p>
                            <p className="text-white">
                                If you&apos;re an engineer who thinks in systems and wants to build technology that matters, we should
                                talk.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <Link href="/contact" className={buttonPrimary}>
                                    Get in touch
                                </Link>
                                <Link href="/products" className={buttonSecondary}>
                                    See our products
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </GlassPage>
    );
}
