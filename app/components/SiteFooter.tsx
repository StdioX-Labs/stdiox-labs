import Image from 'next/image';
import Link from 'next/link';
import { productCategories } from '../data/products';
import { navLinks } from '../data/navigation';

export default function SiteFooter() {
    return (
        <footer className="relative border-t border-white/10 bg-black/90 px-4 md:px-8 py-16 text-sm">
            <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-[1.5fr_repeat(4,1fr)]">
                <div>
                    <Image
                        src="/stdiox.png"
                        alt="StdioX Labs"
                        width={150}
                        height={60}
                        className="w-32 h-auto invert brightness-0 mb-4"
                    />
                    <p className="text-gray-400 leading-relaxed max-w-xs">
                        Engineering the digital infrastructure Africa needs — ticketing, payments, lending and communications.
                    </p>
                    <p className="text-gray-500 mt-4">Kileleshwa, Nairobi · Kenya</p>
                </div>

                {productCategories.map((category) => (
                    <div key={category.id}>
                        <h3 className="text-white text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                            {category.label.split(' ')[0]}
                        </h3>
                        <ul className="space-y-2">
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
                    <h3 className="text-white text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
                        Company
                    </h3>
                    <ul className="space-y-2">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <a href="mailto:info@stdiox.com" className="text-gray-400 hover:text-white transition-colors">
                                info@stdiox.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-gray-500 text-xs">
                © {new Date().getFullYear()} StdioX Labs. Built in Nairobi, for Africa.
            </div>
        </footer>
    );
}
