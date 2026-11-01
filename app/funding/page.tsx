'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
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

const infrastructure = [
    { title: 'Realtime Settlement', body: 'See revenue as it arrives, not weeks after the event.' },
    { title: 'Marketing Attribution', body: 'Know which channel, post or link actually sold the ticket.' },
    { title: 'Built for On-Sale Peaks', body: 'The checkout holds when ten thousand people arrive in the same minute.' },
    { title: 'Split Payments', body: 'Co-promoters and partners paid automatically from the same event.' },
];

export default function FundingPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
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

    return (
        <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
            {/* Background accents */}
            <div className="absolute inset-x-0 top-0 h-[700px] bg-grid pointer-events-none" />
            <div className="absolute -top-40 right-0 w-[700px] h-[500px] rounded-full blur-3xl opacity-25 pointer-events-none bg-gradient-to-br from-violet-500 via-fuchsia-400 to-amber-300" />

            <SiteNav />

            <main className="relative pt-24 pb-16 px-4 md:px-8 md:pt-32 md:pb-20">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className={`mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
                            Funding · Event Prefinancing
                        </p>
                        <h1
                            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
                            style={{ fontFamily: 'var(--font-orbitron)' }}
                        >
                            The event should{' '}
                            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent">
                                fund the event.
                            </span>
                        </h1>
                        <div className="w-32 h-1 mb-8 bg-gradient-to-r from-violet-400 to-pink-400" />
                        <p className="text-lg md:text-2xl text-gray-300 leading-relaxed max-w-3xl">
                            Through SoldOutAfrica, we advance capital to organizers before ticket sales begin — venue deposit,
                            artist advance, marketing — and it is repaid automatically from ticket revenue as it comes in.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-10">
                            <Link
                                href="/contact"
                                onClick={() => handleCtaClick('Header - Talk to Us')}
                                className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105 text-center"
                                style={{ fontFamily: 'var(--font-orbitron)' }}
                            >
                                Talk to Us About Your Event
                            </Link>
                            <a
                                href="https://soldoutafrica.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleCtaClick('Header - SoldOutAfrica')}
                                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center"
                                style={{ fontFamily: 'var(--font-orbitron)' }}
                            >
                                Visit SoldOutAfrica
                            </a>
                        </div>
                    </div>

                    {/* Key Points */}
                    <section className={`grid md:grid-cols-3 gap-6 mb-24 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {[
                            { title: 'No Collateral', body: 'Assessed on the event, not your house. The event is effectively its own security.' },
                            { title: 'Self-Clearing', body: 'Repaid from ticket revenue before settlement. No separate repayment schedule to manage.' },
                            { title: 'Stadium-Scale', body: 'Our V2 capital pool supports far more events, and far bigger ones — not just club nights.' },
                        ].map((point) => (
                            <div key={point.title} className="p-8 border border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm transition-all duration-300">
                                <h3 className="text-xl font-semibold mb-3 text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                    {point.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">{point.body}</p>
                            </div>
                        ))}
                    </section>

                    {/* Cash Flow Comparison */}
                    <section className="mb-24">
                        <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>
                            Your Cash Flow, Before and After
                        </h2>
                        <p className="text-gray-400 text-lg mb-10 max-w-3xl">
                            Without prefinancing you are out of pocket for eight weeks and exposed for every shilling.
                            With it, you run the event on the event&apos;s own money.
                        </p>
                        <div className="overflow-x-auto border border-white/20">
                            <table className="w-full text-left min-w-[520px]">
                                <thead className="bg-white/10" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                    <tr className="text-xs tracking-[0.15em] uppercase">
                                        <th className="p-4 font-semibold">Week</th>
                                        <th className="p-4 font-semibold text-gray-400">Without Prefinancing</th>
                                        <th className="p-4 font-semibold">With Prefinancing</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {timeline.map((row) => (
                                        <tr key={row.week} className="border-t border-white/10">
                                            <td className="p-4 text-white font-medium whitespace-nowrap" style={{ fontFamily: 'var(--font-orbitron)' }}>{row.week}</td>
                                            <td className="p-4 text-gray-500">{row.without}</td>
                                            <td className="p-4 text-white">{row.with}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* What We Look At */}
                    <section className="mb-24">
                        <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>
                            What We Look At
                        </h2>
                        <p className="text-gray-400 text-lg mb-10 max-w-3xl">
                            Decisions are made on the event, not on your personal finances. No history with us is not a
                            disqualification — the conversation just starts earlier, and probably smaller.
                        </p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            {criteria.map((item, index) => (
                                <div key={item.title} className="p-6 border border-white/20 bg-white/5">
                                    <div className="text-3xl font-bold text-gray-600 mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                        0{index + 1}
                                    </div>
                                    <h3 className="text-base font-semibold mb-2 text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Infrastructure */}
                    <section className="mb-24">
                        <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>
                            Capital Needs Infrastructure
                        </h2>
                        <p className="text-gray-400 text-lg mb-10 max-w-3xl">
                            An advance is only as safe as the platform underneath it. Prefinancing sits on the same stack we
                            engineered for SoldOutAfrica.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            {infrastructure.map((item) => (
                                <div key={item.title} className="flex items-start gap-4 p-6 border-l-4 border-white bg-white/5">
                                    <span className="text-white text-xl">→</span>
                                    <div>
                                        <h3 className="font-semibold mb-1 text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400">{item.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Honest Fit */}
                    <section className="mb-24 p-8 md:p-12 border-l-4 border-white bg-white/5 backdrop-blur-sm">
                        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>
                            What prefinancing does not fix
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            It does not make a bad event good, and it does not replace a marketing plan — it funds one. Capital
                            amplifies the outcome in both directions. It earns its keep when upfront costs are large enough
                            that fronting them yourself changes what you are able to attempt.
                        </p>
                    </section>

                    {/* CTA */}
                    <section className="text-center">
                        <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>
                            Bring Us Your Next Event
                        </h2>
                        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                            You don&apos;t need a deck. You need a date, a venue, a lineup and an honest view of what it costs.
                            Tell us what you&apos;re planning in the next six months and we&apos;ll tell you what we can front.
                        </p>
                        <Link
                            href="/contact"
                            onClick={() => handleCtaClick('Footer - Get in Touch')}
                            className="inline-block px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105"
                            style={{ fontFamily: 'var(--font-orbitron)' }}
                        >
                            Get in Touch
                        </Link>
                    </section>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
