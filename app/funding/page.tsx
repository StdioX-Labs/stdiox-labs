'use client';

import { useEffect } from 'react';
import { Eyebrow, GlassPage, MagneticLink, PageHeader } from '../components/LiquidGlass';
import { trackPageView, trackEvent } from '../utils/mixpanel';

const timeline = [
    { week: '−8', without: 'Pay venue deposit from savings', with: 'Advance received' },
    { week: '−6', without: 'Pay artist advance from savings', with: 'Paid from advance' },
    { week: '−4', without: 'Fund marketing from savings', with: 'Paid from advance' },
    { week: '−2', without: 'Tickets start moving', with: 'Tickets start moving' },
    { week: '0', without: 'Event happens', with: 'Event happens' },
    { week: '+1 to +3', without: 'Wait for settlement', with: 'Already settled in realtime' },
];

const criteria = [
    {
        title: 'Sales History',
        body: 'How your past events sold on the platform — pace, tiers, channels. The single strongest signal.',
    },
    {
        title: 'Artist & Lineup',
        body: 'Demand is not abstract. Some names sell out in a weekend.',
    },
    {
        title: 'Venue & Capacity',
        body: 'Capacity sets the ceiling on revenue. Venue costs set the floor on risk.',
    },
    {
        title: 'On-Sale Plan',
        body: 'When you announce, which tiers, at what prices, in what order. A considered plan is a better risk.',
    },
    {
        title: 'Timeline',
        body: 'The window between announcement and event date. Very short windows compress the sales curve.',
    },
];

const keyPoints = [
    { title: 'No collateral', body: 'Assessed on the event, not your house. The event is effectively its own security.' },
    { title: 'Self-clearing', body: 'Repaid from ticket revenue before settlement. No separate repayment schedule to manage.' },
    { title: 'Stadium-scale', body: 'Our V2 capital pool supports far more events, and far bigger ones — not just club nights.' },
];

const infrastructure = [
    { title: 'Realtime Settlement', body: 'See revenue as it arrives, not weeks after the event.' },
    { title: 'Marketing Attribution', body: 'Know which channel, post or link actually sold the ticket.' },
    { title: 'Built for On-Sale Peaks', body: 'The checkout holds when ten thousand people arrive in the same minute.' },
    { title: 'Split Payments', body: 'Co-promoters and partners paid automatically from the same event.' },
];

export default function FundingPage() {
    useEffect(() => {
        trackPageView('Funding', {
            page_title: 'StdioX Labs - Funding',
            page_path: '/funding',
        });
    }, []);

    const handleCtaClick = (cta: string) => {
        trackEvent('Funding CTA Clicked', {
            cta: cta,
            page: 'Funding',
        });
    };

    const sectionHeading = 'text-[2.1rem] sm:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] mb-5';
    const sectionLead = 'text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl mb-10';

    return (
        <GlassPage>
            <PageHeader
                eyebrow="Funding · Event prefinancing"
                title="The event should"
                muted="fund the event."
                lead="Through SoldOutAfrica, we advance capital to organizers before ticket sales begin — venue deposit, artist advance, marketing — and it is repaid automatically from ticket revenue as it comes in."
            >
                <div className="flex flex-col sm:flex-row gap-3">
                    <MagneticLink
                        href="/contact"
                        onClick={() => handleCtaClick('Header - Talk to Us')}
                        className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-zinc-100 text-black font-medium hover:bg-white"
                    >
                        Talk to us about your event
                    </MagneticLink>
                    <a
                        href="https://soldoutafrica.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleCtaClick('Header - SoldOutAfrica')}
                        className="glass inline-flex items-center justify-center px-7 py-3.5 rounded-full font-medium"
                    >
                        Visit SoldOutAfrica ↗
                    </a>
                </div>
            </PageHeader>

            <div className="px-4 md:px-8 pb-16 md:pb-28">
                <div className="max-w-7xl mx-auto space-y-20 md:space-y-32">
                    {/* Key points */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {keyPoints.map((point, index) => (
                            <div
                                key={point.title}
                                data-reveal
                                style={{ transitionDelay: `${index * 90}ms` }}
                                className="glass rounded-[1.75rem] p-6 md:p-8"
                            >
                                <p className="font-mono text-xs text-zinc-500 mb-10 md:mb-16">0{index + 1}</p>
                                <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-3">{point.title}</h3>
                                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">{point.body}</p>
                            </div>
                        ))}
                    </section>

                    {/* Cash flow comparison */}
                    <section data-reveal>
                        <Eyebrow index="01">Cash flow</Eyebrow>
                        <h2 className={sectionHeading}>
                            Before and after. <span className="text-zinc-500">Week by week.</span>
                        </h2>
                        <p className={sectionLead}>
                            Without prefinancing you are out of pocket for eight weeks and exposed for every shilling. With it,
                            you run the event on the event&apos;s own money.
                        </p>
                        <div className="glass rounded-[1.75rem] overflow-hidden">
                            <div className="hidden sm:grid grid-cols-[110px_1fr_1fr] gap-4 px-6 py-4 border-b border-white/10 font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-500">
                                <span>Week</span>
                                <span>Without prefinancing</span>
                                <span className="text-zinc-200">With prefinancing</span>
                            </div>
                            {timeline.map((row) => (
                                <div
                                    key={row.week}
                                    className="grid grid-cols-[72px_1fr] sm:grid-cols-[110px_1fr_1fr] gap-x-4 gap-y-1 px-5 sm:px-6 py-4 border-b border-white/[0.06] last:border-b-0"
                                >
                                    <span className="font-mono text-sm text-white row-span-2 sm:row-span-1">{row.week}</span>
                                    <span className="text-zinc-500 text-sm">
                                        <span className="sm:hidden text-zinc-600">Without · </span>
                                        {row.without}
                                    </span>
                                    <span className="text-white text-sm">
                                        <span className="sm:hidden text-zinc-500">With · </span>
                                        {row.with}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* What we look at */}
                    <section>
                        <div data-reveal>
                            <Eyebrow index="02">Assessment</Eyebrow>
                            <h2 className={sectionHeading}>
                                What we look at. <span className="text-zinc-500">The event, not you.</span>
                            </h2>
                            <p className={sectionLead}>
                                Decisions are made on the event, not on your personal finances. No history with us is not a
                                disqualification — the conversation just starts earlier, and probably smaller.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                            {criteria.map((item, index) => (
                                <div
                                    key={item.title}
                                    data-reveal
                                    style={{ transitionDelay: `${index * 70}ms` }}
                                    className="glass rounded-[1.5rem] p-6"
                                >
                                    <p className="font-mono text-xs text-zinc-500 mb-4 sm:mb-8">0{index + 1}</p>
                                    <h3 className="font-medium mb-2">{item.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Infrastructure */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                        <div data-reveal>
                            <Eyebrow index="03">Infrastructure</Eyebrow>
                            <h2 className={sectionHeading}>
                                Capital needs <span className="text-zinc-500">infrastructure.</span>
                            </h2>
                            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                                An advance is only as safe as the platform underneath it. Prefinancing sits on the same stack we
                                engineered for SoldOutAfrica.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
                            {infrastructure.map((item, index) => (
                                <div
                                    key={item.title}
                                    data-reveal
                                    style={{ transitionDelay: `${index * 70}ms` }}
                                    className="glass rounded-[1.5rem] p-6"
                                >
                                    <h3 className="font-medium mb-2">{item.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Honest fit */}
                    <section data-reveal className="glass rounded-[2rem] p-6 sm:p-10 md:p-14">
                        <Eyebrow>Honest fit</Eyebrow>
                        <h2 className="text-2xl md:text-4xl font-semibold tracking-[-0.02em] mb-5">What prefinancing does not fix</h2>
                        <p className="text-zinc-300 leading-relaxed text-base md:text-lg max-w-3xl">
                            It does not make a bad event good, and it does not replace a marketing plan — it funds one. Capital
                            amplifies the outcome in both directions. It earns its keep when upfront costs are large enough that
                            fronting them yourself changes what you are able to attempt.
                        </p>
                    </section>

                    {/* CTA */}
                    <section data-reveal className="text-center">
                        <h2 className="text-[2.4rem] sm:text-6xl font-semibold tracking-[-0.04em] leading-[1] mb-6">
                            Bring us your <span className="text-zinc-500">next event.</span>
                        </h2>
                        <p className="text-zinc-400 text-base md:text-lg mb-10 max-w-2xl mx-auto">
                            You don&apos;t need a deck. You need a date, a venue, a lineup and an honest view of what it costs.
                            Tell us what you&apos;re planning in the next six months and we&apos;ll tell you what we can front.
                        </p>
                        <MagneticLink
                            href="/contact"
                            onClick={() => handleCtaClick('Footer - Get in Touch')}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-zinc-100 text-black font-medium hover:bg-white"
                        >
                            Get in touch
                        </MagneticLink>
                    </section>
                </div>
            </div>
        </GlassPage>
    );
}
