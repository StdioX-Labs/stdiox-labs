'use client';

import { useEffect } from 'react';
import { Eyebrow, GlassPage, PageHeader } from '../components/LiquidGlass';
import { trackPageView, trackEvent } from '../utils/mixpanel';

const contactMethods = [
    {
        id: 'email',
        label: 'Email',
        value: 'info@stdiox.com',
        href: 'mailto:info@stdiox.com',
        note: 'Drop us a line anytime',
    },
    {
        id: 'phone',
        label: 'Customer support',
        value: '+254 183 053 254',
        href: 'tel:+254183053254',
        note: 'Monday to Friday, 9am to 6pm EAT',
    },
    {
        id: 'location',
        label: 'Office',
        value: 'Kentmere Valley, Kileleshwa',
        href: 'https://maps.google.com/?q=Kentmere+Valley+Kileleshwa+Nairobi',
        note: 'Nairobi, Kenya',
    },
];

const reasons = [
    {
        title: 'Product demos',
        body: "SoldOutAfrica, StdioX Comms, Pay, Looker, Score, CRM and Bookings. Tell us which and we'll set up a walkthrough.",
    },
    {
        title: 'Event and SME prefinancing',
        body: "For an event, share your date, venue, lineup and budget. For a business, share your sales and what you need funded. We'll tell you what we can prefinance.",
    },
    {
        title: 'Technical questions',
        body: 'Our engineering team answers technical questions within 24 hours.',
    },
    {
        title: 'Partnerships and custom builds',
        body: 'Integrations, collaborations and platforms built on our stack.',
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
                eyebrow="contact"
                title="Contact us"
                lead="Email or call for a demo, a partnership, event or SME prefinancing, or custom work. You'll reach the engineers who build the products."
            />

            <div className="px-4 md:px-8 pb-16 md:pb-28">
                <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
                    <section data-reveal className="glass rounded-3xl divide-y divide-white/[0.07]">
                        {contactMethods.map((method) => (
                            <a
                                key={method.id}
                                href={method.href}
                                target={method.id === 'location' ? '_blank' : undefined}
                                rel={method.id === 'location' ? 'noopener noreferrer' : undefined}
                                onClick={() => handleContactClick(method.label, method.value)}
                                className="group grid grid-cols-[1fr_auto] md:grid-cols-[12rem_1fr_auto] items-center gap-x-6 gap-y-1 px-6 md:px-8 py-6 hover:bg-white/[0.04] transition-colors"
                            >
                                <span className="col-span-2 md:col-span-1 text-sm text-zinc-500">{method.label}</span>
                                <span>
                                    <span className="block text-xl md:text-2xl text-white">{method.value}</span>
                                    <span className="block mt-1 text-sm text-zinc-500">{method.note}</span>
                                </span>
                                <span className="text-zinc-600 group-hover:text-brand transition-colors" aria-hidden="true">
                                    →
                                </span>
                            </a>
                        ))}
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                        <div data-reveal className="lg:col-span-4">
                            <Eyebrow>how we can help</Eyebrow>
                            <h2 className="text-[2rem] sm:text-[2.75rem] font-medium tracking-[-0.03em] leading-[1.05]">
                                What to get in touch about
                            </h2>
                        </div>
                        <div data-reveal className="lg:col-span-8 glass rounded-3xl grid sm:grid-cols-2">
                            {reasons.map((reason, index) => (
                                <div
                                    key={reason.title}
                                    className={`p-6 md:p-8 border-white/[0.07] ${index > 0 ? 'border-t' : ''} ${index === 1 ? 'sm:border-t-0' : ''} ${index % 2 === 1 ? 'sm:border-l' : ''}`}
                                >
                                    <h3 className="text-white font-medium mb-2">{reason.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{reason.body}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </GlassPage>
    );
}
