'use client';

import SiteNav from './SiteNav';
import GlassHero from './heroes/GlassHero';
import { DotField } from './HomeVisuals';
import { Eyebrow } from './LiquidGlass';

/** The liquid glass hero, followed by where we work with the dotted map of Africa. */
export default function HeroSection() {
    return (
        <>
            <SiteNav />
            <GlassHero />

            <section className="px-4 md:px-8 py-20 md:py-28 text-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                    <div data-reveal className="lg:col-span-6 xl:col-span-7">
                        <Eyebrow>where we work</Eyebrow>
                        <h2 className="text-[2.25rem] sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.02] tracking-[-0.035em] mb-6 max-w-xl">
                            Built in Nairobi, for businesses across Africa.
                        </h2>
                        <p className="text-lg text-zinc-400 leading-relaxed max-w-xl">
                            Our products are designed around how people here pay and talk to businesses: M-Pesa and mobile money,
                            cards with 3-D Secure, USSD, SMS and WhatsApp, and ticket sales that spike the minute an event goes on
                            sale.
                        </p>
                    </div>
                    <div data-reveal className="lg:col-span-6 xl:col-span-5">
                        <DotField shape="africa" className="mx-auto max-w-[340px] sm:max-w-[440px] lg:max-w-[min(31.25rem,75svh)]" />
                    </div>
                </div>
            </section>
        </>
    );
}
