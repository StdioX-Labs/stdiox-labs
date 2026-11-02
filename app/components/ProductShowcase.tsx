'use client';

import Link from 'next/link';
import ProductVisual from './ProductVisual';
import { statusLabels, type Product } from '../data/products';
import { trackEvent } from '../utils/mixpanel';

// Neutral chrome accent so the product mockups sit inside the gray glass theme.
const chrome: [string, string] = ['#f4f4f5', '#71717a'];

interface ProductShowcaseProps {
    product: Product;
    reverse?: boolean;
    page: string;
}

export default function ProductShowcase({ product, reverse = false, page }: ProductShowcaseProps) {
    const handleClick = () => {
        trackEvent('Product Clicked', {
            product_name: product.name,
            product_url: product.url,
            page: page,
        });
    };

    const ctaClass = 'group inline-flex items-center gap-3 pl-6 pr-1.5 py-1.5 rounded-full bg-white text-black font-medium hover:bg-zinc-200 transition-colors';
    const ctaArrow = (
        <span className="grid place-items-center w-9 h-9 rounded-full bg-black text-white group-hover:rotate-[-45deg] transition-transform duration-300">→</span>
    );

    return (
        <article
            id={product.id}
            data-reveal
            onMouseEnter={() => trackEvent('Product Hovered', { product_name: product.name, page: page })}
            className="glass grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center rounded-[2rem] p-5 sm:p-8 lg:p-12 scroll-mt-28"
        >
            <div className={reverse ? 'lg:order-2' : ''}>
                <span className="inline-block mb-5 text-[10px] uppercase tracking-widest text-zinc-300 border border-white/15 rounded-full px-2.5 py-1">
                    {statusLabels[product.status]}
                </span>
                <h3 className="text-3xl md:text-4xl font-semibold tracking-[-0.025em] mb-2">{product.name}</h3>
                <p className="text-lg md:text-xl text-zinc-500 mb-6">{product.tagline}</p>
                <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-8">{product.description}</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-10">
                    {product.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-zinc-400">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-zinc-400" />
                            {feature}
                        </li>
                    ))}
                </ul>
                {product.url ? (
                    <a href={product.url} target="_blank" rel="noopener noreferrer" onClick={handleClick} className={ctaClass}>
                        Visit platform {ctaArrow}
                    </a>
                ) : (
                    <Link href="/contact" onClick={handleClick} className={ctaClass}>
                        {product.status === 'early-access' ? 'Join early access' : 'Request a demo'} {ctaArrow}
                    </Link>
                )}
            </div>
            <div className={reverse ? 'lg:order-1' : ''}>
                <ProductVisual productId={product.id} accent={chrome} />
            </div>
        </article>
    );
}
