'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductVisual from './ProductVisual';
import { KeypadDots, RackDots, SpikeDots } from './HomeVisuals';
import { Eyebrow } from './LiquidGlass';
import { buttonPrimary, buttonSecondary } from './ui';
import { allProducts, statusLabels, type Product } from '../data/products';
import { trackEvent } from '../utils/mixpanel';

const soldOutAfrica = allProducts.find((product) => product.id === 'soldoutafrica');

// One product from each area, shown in the tabbed showcase.
const showcase = ['soldoutafrica', 'pay', 'looker', 'score', 'comms']
    .map((id) => allProducts.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));

const TAB_DURATION = 7000;

// Neutral chrome accent so the product mockups sit inside the gray theme.
const chrome: [string, string] = ['#f4f4f5', '#71717a'];

const engineeringSpecs = [
    { label: 'Backends', value: 'Java 21 and Spring Boot, Python and FastAPI' },
    { label: 'Data', value: 'PostgreSQL, Redis, RabbitMQ' },
    { label: 'Hosting', value: 'Kubernetes we run ourselves on Talos Linux, with MetalLB and continuous deploys' },
    { label: 'Identity', value: 'Passkeys (WebAuthn) and single sign-on' },
    { label: 'Channels', value: 'M-Pesa, cards with 3-D Secure, USSD, SMS, email and WhatsApp' },
    { label: 'AI', value: 'WhatsApp agents on DeepSeek, Claude, GPT-4o or Gemini that call your own APIs' },
    { label: 'Verification', value: 'Face detection and landmark matching for KYC' },
];

const engineeringNotes: { title: string; body: string; visual: ReactNode }[] = [
    {
        title: 'We run our own cloud',
        body: 'Production runs on Kubernetes clusters we operate ourselves, so we control capacity, cost and every deploy.',
        visual: <RackDots />,
    },
    {
        title: 'Built for on-sale spikes',
        body: 'Ticket checkout holds when thousands of buyers arrive in the same minute an event goes on sale.',
        visual: <SpikeDots />,
    },
    {
        title: 'Works without a smartphone',
        body: 'USSD sits alongside web, app and WhatsApp, for customers on feature phones.',
        visual: <KeypadDots />,
    },
];

const sectionHeading = 'text-[2.25rem] sm:text-5xl lg:text-[3.5rem] font-medium tracking-[-0.035em] leading-[1.04]';

/** A list of products on the left and the selected product's interface on the right. It advances on its own until hovered. */
function ProductTabs({ onNavigate }: { onNavigate: (name: string) => void }) {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        const timeout = setTimeout(() => setActive((current) => (current + 1) % showcase.length), TAB_DURATION);
        return () => clearTimeout(timeout);
    }, [active, paused]);

    const product = showcase[active];

    return (
        <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
        >
            <ol className="lg:col-span-5">
                {showcase.map((item, index) => {
                    const isActive = index === active;
                    return (
                        <li key={item.id} className="relative border-t border-white/10 last:border-b">
                            {isActive && (
                                <span
                                    key={active}
                                    className="absolute left-0 right-0 -top-px h-px bg-white origin-left"
                                    style={{ animation: `tab-progress ${TAB_DURATION}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' }}
                                />
                            )}
                            <button
                                type="button"
                                onClick={() => setActive(index)}
                                aria-expanded={isActive}
                                className={`flex w-full items-center gap-3 py-5 text-left text-lg transition-colors cursor-pointer ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                                <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? 'bg-brand' : 'bg-zinc-700'}`} />
                                {item.name}
                                <span className="ml-auto text-xs text-zinc-600">{statusLabels[item.status]}</span>
                            </button>
                            <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                <div className="overflow-hidden">
                                    <p className="pl-[18px] pr-4 text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                                    <Link
                                        href={`/products#${item.id}`}
                                        onClick={() => onNavigate(item.name)}
                                        tabIndex={isActive ? 0 : -1}
                                        className="inline-block pl-[18px] pt-3 pb-6 text-sm text-white underline decoration-white/30 underline-offset-4 hover:decoration-brand"
                                    >
                                        More about {item.name}
                                    </Link>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ol>

            <div className="lg:col-span-7 lg:sticky lg:top-28">
                <div className="glass rounded-[2rem] p-4 sm:p-6 md:p-10 min-h-[360px] md:min-h-[460px] flex flex-col justify-center">
                    <div key={product.id} className="animate-fade-up">
                        <ProductVisual productId={product.id} accent={chrome} />
                    </div>
                </div>
                <p className="mt-4 text-sm text-zinc-500">
                    {product.name} · {product.tagline}
                </p>
            </div>
        </div>
    );
}

export default function PlatformSections() {
    const handleClick = (destination: string, location: string) => {
        trackEvent('Navigation Clicked', {
            destination: destination,
            from_page: 'Home',
            location: location,
        });
    };

    return (
        <div className="relative text-white">
            {/* Products */}
            <section id="platform" className="px-4 md:px-8 py-20 md:py-32 scroll-mt-24">
                <div className="max-w-7xl mx-auto">
                    <div data-reveal className="grid lg:grid-cols-12 gap-6 lg:gap-16 lg:items-end mb-12 md:mb-16">
                        <div className="lg:col-span-5">
                            <Eyebrow>products</Eyebrow>
                            <h2 className={sectionHeading}>What we make</h2>
                        </div>
                        <div className="lg:col-span-7 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-md">
                                {allProducts.length} products across ticketing, payments and messaging, all built and run by the same
                                team in Nairobi.
                            </p>
                            <Link href="/products" onClick={() => handleClick('Products', 'Product Showcase')} className={`${buttonSecondary} shrink-0`}>
                                All products
                            </Link>
                        </div>
                    </div>
                    <div data-reveal>
                        <ProductTabs onNavigate={(name) => handleClick(name, 'Product Showcase')} />
                    </div>
                </div>
            </section>

            {/* SoldOutAfrica */}
            {soldOutAfrica && (
                <section className="px-4 md:px-8 pb-20 md:pb-32">
                    <div data-reveal className="glass max-w-7xl mx-auto rounded-[2rem] p-4 md:p-6 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-5 overflow-hidden rounded-[1.25rem] bg-black">
                            <Image
                                src="/soldoutafrica.jpg"
                                alt="SoldOutAfrica, powered by StdioX"
                                width={805}
                                height={933}
                                className="w-full h-auto max-h-[520px] object-contain"
                            />
                        </div>
                        <div className="lg:col-span-7 px-2 pb-4 lg:px-0 lg:pb-0 lg:pr-6">
                            <Eyebrow>our ticketing platform</Eyebrow>
                            <h2 className={`${sectionHeading} mb-5`}>SoldOutAfrica</h2>
                            <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-4">{soldOutAfrica.description}</p>
                            <p className="text-zinc-400 leading-relaxed mb-8">
                                Organizers selling on SoldOutAfrica can also apply for event prefinancing: the venue deposit, artist
                                advance and marketing budget paid up front, then recovered from ticket sales.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href="https://soldoutafrica.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackEvent('Product Clicked', { product_name: 'SoldOutAfrica', product_url: 'https://soldoutafrica.com/', page: 'Home' })}
                                    className={buttonPrimary}
                                >
                                    Visit soldoutafrica.com
                                </a>
                                <Link href="/products#prefinancing" onClick={() => handleClick('Prefinancing', 'SoldOutAfrica')} className={buttonSecondary}>
                                    About prefinancing
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Engineering, on a light band */}
            <section className="bg-[#ececee] text-zinc-900 px-4 md:px-8 py-20 md:py-32">
                <div className="max-w-7xl mx-auto">
                    <div data-reveal className="grid lg:grid-cols-12 gap-6 lg:gap-16 lg:items-end mb-12 md:mb-16">
                        <div className="lg:col-span-5">
                            <Eyebrow className="text-zinc-500">engineering</Eyebrow>
                            <h2 className={sectionHeading}>How the products are built</h2>
                        </div>
                        <p className="lg:col-span-7 text-zinc-600 text-base md:text-lg leading-relaxed max-w-xl">
                            We write, host and operate everything ourselves. Here are some of the specifics.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        {/* A real response from Looker */}
                        <div data-reveal className="lg:col-span-7 rounded-3xl bg-[#111113] text-white overflow-hidden flex flex-col">
                            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/[0.08] text-sm">
                                <span className="font-mono text-zinc-300">POST /v1/screen</span>
                                <span className="text-zinc-500">Looker</span>
                            </div>
                            <pre className="flex-1 overflow-x-auto px-6 py-6 font-mono text-[13px] leading-relaxed text-zinc-400">
                                {'{\n  '}
                                <span className="text-zinc-500">&quot;decision&quot;</span>: <span className="text-brand">&quot;decline&quot;</span>
                                {',\n  '}
                                <span className="text-zinc-500">&quot;score&quot;</span>: <span className="text-white">79</span>
                                {',\n  '}
                                <span className="text-zinc-500">&quot;band&quot;</span>: <span className="text-white">&quot;high&quot;</span>
                                {',\n  '}
                                <span className="text-zinc-500">&quot;reasons&quot;</span>
                                {': [\n    { '}
                                <span className="text-zinc-500">&quot;code&quot;</span>: <span className="text-white">&quot;GEO_TRIPLE_MISMATCH&quot;</span>, <span className="text-zinc-500">&quot;points&quot;</span>: <span className="text-white">10.5</span>
                                {' },\n    { '}
                                <span className="text-zinc-500">&quot;code&quot;</span>: <span className="text-white">&quot;CVV_MISMATCH&quot;</span>, <span className="text-zinc-500">&quot;points&quot;</span>: <span className="text-white">8.96</span>
                                {' }\n  ]\n}'}
                            </pre>
                            <p className="px-6 py-5 border-t border-white/[0.08] text-sm text-zinc-400 leading-relaxed">
                                Looker screens every card payment before it reaches the acquirer and decides in milliseconds whether
                                to approve, challenge with 3-D Secure or decline. Each decision comes with reason codes, plus the
                                evidence needed to win a dispute.
                            </p>
                        </div>

                        {/* Stack spec sheet */}
                        <dl data-reveal className="lg:col-span-5 rounded-3xl bg-white divide-y divide-zinc-200">
                            {engineeringSpecs.map((spec) => (
                                <div key={spec.label} className="grid grid-cols-[6.5rem_1fr] gap-4 px-6 py-4">
                                    <dt className="text-sm text-zinc-500">{spec.label}</dt>
                                    <dd className="text-sm text-zinc-900 leading-relaxed">{spec.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {engineeringNotes.map((note) => (
                            <div key={note.title} data-reveal className="rounded-3xl bg-white p-3">
                                <div className="aspect-[4/3] rounded-[1.25rem] bg-[#111113] p-6">{note.visual}</div>
                                <div className="px-3 pt-5 pb-3">
                                    <h3 className="font-medium text-zinc-900 mb-1.5">{note.title}</h3>
                                    <p className="text-sm text-zinc-600 leading-relaxed">{note.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
