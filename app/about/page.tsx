'use client';

import { useEffect } from 'react';
import { Eyebrow, GlassPage, MagneticLink, PageHeader } from '../components/LiquidGlass';
import { trackPageView } from '../utils/mixpanel';

const principles = [
    {
        title: 'Deep technical work',
        body: "We don't build features. We build systems. Infrastructure that scales. Code that lasts. Architecture that matters.",
    },
    {
        title: 'Context-aware solutions',
        body: "Africa's infrastructure challenges are unique. Our solutions account for connectivity, cost, and real-world constraints.",
    },
    {
        title: 'Open collaboration',
        body: 'Great engineering happens in the open. We share knowledge, contribute to open source, and build with transparency.',
    },
    {
        title: 'Long-term thinking',
        body: "We optimize for decades, not quarters. The infrastructure we build today should serve Africa's next generation.",
    },
];

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
                eyebrow="About us"
                title="Built by engineers."
                muted="Defined by impact."
                lead="StdioX Labs is an engineering company in Nairobi building the ticketing, payments, lending and communications infrastructure African businesses run on."
            />

            <div className="px-4 md:px-8 pb-16 md:pb-28">
                <div className="max-w-7xl mx-auto space-y-20 md:space-y-32">
                    {/* Origin */}
                    <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-16">
                        <div data-reveal>
                            <Eyebrow index="01">Origin</Eyebrow>
                            <h2 className="text-[2.1rem] sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.05]">
                                Engineering <span className="text-zinc-500">first.</span>
                            </h2>
                        </div>
                        <div data-reveal className="space-y-6 text-zinc-300 leading-relaxed text-base md:text-lg">
                            <p>
                                StdioX Labs was founded on a simple principle:{' '}
                                <span className="text-white font-medium">great technology solves real problems</span>. We started in
                                a room full of engineers who believed Africa&apos;s next chapter would be written in code.
                            </p>
                            <p>
                                Not by consultants theorizing about solutions. Not by copying what worked elsewhere. But by
                                engineers who understood the constraints, the opportunities, and the technical challenges unique
                                to our continent.
                            </p>
                            <p className="text-white">We built our first system from first principles. Then we built the next one better.</p>
                        </div>
                    </section>

                    {/* Principles */}
                    <section>
                        <div data-reveal>
                            <Eyebrow index="02">How we work</Eyebrow>
                            <h2 className="text-[2.1rem] sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] mb-10 md:mb-14">
                                Four principles. <span className="text-zinc-500">No exceptions.</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {principles.map((item, index) => (
                                <div
                                    key={item.title}
                                    data-reveal
                                    style={{ transitionDelay: `${index * 90}ms` }}
                                    className="glass flex flex-col rounded-[1.75rem] p-6 md:p-7 lg:min-h-[280px]"
                                >
                                    <span className="font-mono text-xs text-zinc-500">0{index + 1}</span>
                                    <h3 className="mt-8 lg:mt-auto text-xl font-medium tracking-tight mb-3">{item.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Mission */}
                    <section data-reveal className="glass rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-16">
                        <Eyebrow>Mission</Eyebrow>
                        <blockquote className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-[-0.02em] leading-[1.2] max-w-5xl">
                            &ldquo;Africa&apos;s digital transformation will be built by those who understand both the technology
                            and the terrain. <span className="text-zinc-500">We are those engineers.&rdquo;</span>
                        </blockquote>
                    </section>

                    {/* Team */}
                    <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-16">
                        <div data-reveal>
                            <Eyebrow index="03">Our team</Eyebrow>
                            <h2 className="text-[2.1rem] sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.05]">
                                Engineers, <span className="text-zinc-500">every one of us.</span>
                            </h2>
                        </div>
                        <div data-reveal className="space-y-6 text-zinc-300 leading-relaxed text-base md:text-lg">
                            <p>
                                Every member of StdioX Labs is an engineer first. We hire people who can build, who can debug, who
                                can architect systems that handle millions of transactions.
                            </p>
                            <p>
                                We&apos;re distributed across Africa — Lagos, Nairobi, Cairo, Cape Town, and beyond. Different
                                cities, one mission:{' '}
                                <span className="text-white font-medium">engineering Africa&apos;s digital infrastructure</span>.
                            </p>
                            <p className="text-white">
                                If you&apos;re an engineer who thinks in systems, who values craft, and who wants to build technology
                                that matters — we should talk.
                            </p>
                        </div>
                    </section>

                    {/* CTA */}
                    <section data-reveal className="text-center">
                        <h2 className="text-[2.4rem] sm:text-6xl font-semibold tracking-[-0.04em] leading-[1] mb-10">
                            Join <span className="text-zinc-500">us.</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <MagneticLink href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-zinc-100 text-black font-medium hover:bg-white">
                                Get in touch
                            </MagneticLink>
                            <MagneticLink href="/products" className="glass inline-flex items-center justify-center px-8 py-4 rounded-full font-medium">
                                See our work
                            </MagneticLink>
                        </div>
                    </section>
                </div>
            </div>
        </GlassPage>
    );
}
