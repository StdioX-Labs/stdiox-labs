import Image from 'next/image';
import Link from 'next/link';
import { productCategories } from '../data/products';
import { navLinks } from '../data/navigation';

export default function SiteFooter() {
    return (
        <footer className="relative overflow-hidden bg-black/50 backdrop-blur-2xl border-t border-white/10 text-sm">
            {/* Accent line and glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-3xl opacity-[0.07] pointer-events-none bg-white" />

            <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-10">
                {/* Top: brand and contact */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 pb-14 border-b border-white/10">
                    <div className="max-w-md">
                        <Image
                            src="/stdiox.png"
                            alt="StdioX Labs"
                            width={150}
                            height={60}
                            className="w-32 h-auto invert brightness-0 mb-6"
                        />
                        <p className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white leading-snug">
                            Building the infrastructure African business runs on.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href="mailto:info@stdiox.com"
                            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
                        >
                            info@stdiox.com
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                        <a
                            href="tel:+254183053254"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
                        >
                            Support · +254 183 053 254
                        </a>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
                        >
                            Book a demo
                        </Link>
                    </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14">
                    {productCategories.map((category) => (
                        <div key={category.id}>
                            <h3 className="flex items-center gap-2 font-mono text-zinc-300 text-xs tracking-[0.2em] uppercase mb-5">
                                <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-zinc-500" />
                                {category.label.split(' ')[0]}
                            </h3>
                            <ul className="space-y-3">
                                {category.products.map((product) => (
                                    <li key={product.id}>
                                        <Link href={`/products#${product.id}`} className="text-gray-400 hover:text-white transition-colors">
                                            {product.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h3 className="flex items-center gap-2 font-mono text-zinc-300 text-xs tracking-[0.2em] uppercase mb-5">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-white" />
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Wordmark */}
                <p
                    aria-hidden="true"
                    className="select-none text-center font-bold leading-none tracking-tight bg-gradient-to-b from-white/15 to-transparent bg-clip-text text-transparent text-[18vw] lg:text-[13rem]"
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                >
                    STDIOX
                </p>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-6 border-t border-white/10 text-gray-500 text-xs">
                    <p>© {new Date().getFullYear()} StdioX Labs. Built in Nairobi, for Africa.</p>
                    <p className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse" />
                        Kileleshwa, Nairobi · Kenya
                    </p>
                </div>
            </div>
        </footer>
    );
}
