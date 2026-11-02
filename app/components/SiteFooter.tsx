import Image from 'next/image';
import Link from 'next/link';
import { productCategories } from '../data/products';
import { navLinks } from '../data/navigation';

export default function SiteFooter() {
    return (
        <footer className="relative border-t border-white/10 bg-black/40 backdrop-blur-xl text-sm">
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-10">
                <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
                    <div className="col-span-2 md:col-span-4">
                        <Image src="/stdiox.png" alt="StdioX Labs" width={150} height={60} className="w-32 h-auto logo-on-dark mb-5" />
                        <p className="text-zinc-400 leading-relaxed max-w-xs">
                            Software for businesses in Africa, built and run from Kileleshwa, Nairobi.
                        </p>
                        <div className="mt-5 space-y-1">
                            <a href="mailto:info@stdiox.com" className="block text-white hover:text-zinc-300 transition-colors">
                                info@stdiox.com
                            </a>
                            <a href="tel:+254183053254" className="block text-white hover:text-zinc-300 transition-colors">
                                +254 183 053 254
                            </a>
                        </div>
                    </div>

                    {productCategories.map((category) => (
                        <div key={category.id} className="md:col-span-2">
                            <h3 className="text-zinc-500 mb-4">{category.label.split(' ')[0]}</h3>
                            <ul className="space-y-2.5">
                                {category.products.map((product) => (
                                    <li key={product.id}>
                                        <Link href={`/products#${product.id}`} className="text-zinc-300 hover:text-white transition-colors">
                                            {product.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="md:col-span-2">
                        <h3 className="text-zinc-500 mb-4">Company</h3>
                        <ul className="space-y-2.5">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-zinc-300 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:justify-between gap-2 text-xs text-zinc-500">
                    <p>© {new Date().getFullYear()} StdioX Labs</p>
                    <p>Kileleshwa, Nairobi, Kenya</p>
                </div>
            </div>
        </footer>
    );
}
