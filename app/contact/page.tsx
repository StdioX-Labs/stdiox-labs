'use client';

import { useEffect } from 'react';
import { Eyebrow, GlassPage, MagneticLink, PageHeader } from '../components/LiquidGlass';
import { trackPageView, trackEvent } from '../utils/mixpanel';

const contactMethods = [
    {
        id: 'email',
        label: 'Email',
        value: 'info@stdiox.com',
        href: 'mailto:info@stdiox.com',
        description: 'Drop us a line anytime',
    },
    {
        id: 'phone',
        label: 'Customer support',
        value: '+254 183 053 254',
        href: 'tel:+254183053254',
        description: 'Available Mon–Fri, 9AM–6PM EAT',
    },
    {
        id: 'location',
        label: 'Location',
        value: 'Kentmere Valley',
        href: 'https://maps.google.com/?q=Kentmere+Valley+Kileleshwa+Nairobi',
        description: 'Kileleshwa, Nairobi · Kenya',
    },
];

const reasons = [
    {
        title: 'Product demos',
        body: "SoldOutAfrica, StdioX Comms, Pay, Looker, Score, CRM and Bookings — tell us which and we'll set up a walkthrough.",
    },
    {
        title: 'Event prefinancing',
        body: "Selling on SoldOutAfrica? Share your date, venue, lineup and budget and we'll tell you what we can prefinance.",
    },
    {
        title: 'Technical inquiries',
        body: 'Our engineering team responds to technical questions within 24 hours.',
    },
    {
        title: 'Partnerships',
        body: 'Reach out to discuss collaboration and integration possibilities.',
    },
];

export default function ContactPage() {
    useEffect(() => {
        trackPageView('Contact', {
            page_title: 'StdioX Labs - Contact',
            page_path: '/contact',
        });
    }, []);

    const handleContactClick = (method: string, value: string) => {
        trackEvent('Contact Method Clicked', {
            method: method,
            value: value,
            page: 'Contact',
        });
    };

    return (
        <GlassPage>
            <PageHeader
                eyebrow="Contact"
                title="Let's build"
                muted="something exceptional."
                lead="Product demos, a custom build or a partnership — talk to the engineers directly."
            />

            <div className="px-4 md:px-8 pb-16 md:pb-28">
                <div className="max-w-7xl mx-auto space-y-16 md:space-y-28">
                    {/* Contact methods */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {contactMethods.map((method, index) => (
                            <a
                                key={method.id}
                                href={method.href}
                                target={method.id === 'location' ? '_blank' : undefined}
                                rel={method.id === 'location' ? 'noopener noreferrer' : undefined}
                                onClick={() => handleContactClick(method.label, method.value)}
                                data-reveal
                                style={{ transitionDelay: `${index * 90}ms` }}
                                className="glass group flex flex-col rounded-3xl p-6 md:p-8 hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-between mb-10 md:mb-16">
                                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">{method.label}</span>
                                    <span className="grid place-items-center w-10 h-10 rounded-full border border-white/15 text-zinc-300 group-hover:bg-white group-hover:text-black group-hover:rotate-[-45deg] transition-all duration-500">
                                        →
                                    </span>
                                </div>
                                <p className="text-2xl md:text-[1.7rem] font-medium tracking-tight mb-2 break-words">{method.value}</p>
                                <p className="text-sm text-zinc-500">{method.description}</p>
                            </a>
                        ))}
                    </section>

                    {/* Reasons */}
                    <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-16">
                        <div data-reveal>
                            <Eyebrow index="01">Ready to start?</Eyebrow>
                            <h2 className="text-[2rem] sm:text-[2.75rem] lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] mb-5">
                                What we can <span className="serif-accent text-zinc-400">help with.</span>
                            </h2>
                            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                                Office hours are Monday to Friday, 9:00 AM – 6:00 PM East Africa Time.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {reasons.map((reason, index) => (
                                <div
                                    key={reason.title}
                                    data-reveal
                                    style={{ transitionDelay: `${index * 70}ms` }}
                                    className="glass rounded-3xl p-6"
                                >
                                    <h3 className="font-medium mb-2">{reason.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{reason.body}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Links */}
                    <section data-reveal className="text-center">
                        <p className="text-zinc-500 text-sm mb-6">Operating from Nairobi, building for Africa</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <MagneticLink href="/products" className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-black font-medium hover:bg-zinc-200">
                                View our work
                            </MagneticLink>
                            <MagneticLink href="/about" className="glass inline-flex items-center justify-center px-7 py-3.5 rounded-full font-medium">
                                Learn about us
                            </MagneticLink>
                        </div>
                    </section>
                </div>
            </div>
        </GlassPage>
    );
}
