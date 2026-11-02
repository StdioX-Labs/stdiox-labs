'use client';

import Link from 'next/link';
import ProductVisual from './ProductVisual';
import { buttonPrimary } from './ui';
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

    return (
        <article
            id={product.id}
            data-reveal
            onMouseEnter={() => trackEvent('Product Hovered', { product_name: product.name, page: page })}
            className="glass grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center rounded-[2rem] p-5 sm:p-8 lg:p-12 scroll-mt-28"
        >
            <div className={reverse ? 'lg:order-2' : ''}>
                <p className="mb-4 text-sm text-zinc-500">{statusLabels[product.status]}</p>
                <h3 className="text-3xl md:text-4xl font-semibold tracking-[-0.025em] mb-2">{product.name}</h3>
                <p className="text-lg md:text-xl text-zinc-400 mb-6">{product.tagline}</p>
                <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-8">{product.description}</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-10">
                    {product.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-zinc-400">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-brand" />
                            {feature}
                        </li>
                    ))}
                </ul>
                {product.url ? (
                    <a href={product.url} target="_blank" rel="noopener noreferrer" onClick={handleClick} className={buttonPrimary}>
                        Visit {new URL(product.url).hostname.replace('www.', '')}
                    </a>
                ) : (
                    <Link href="/contact" onClick={handleClick} className={buttonPrimary}>
                        {product.status === 'early-access' ? 'Join early access' : 'Request a demo'}
                    </Link>
                )}
            </div>
            <div className={reverse ? 'lg:order-1' : ''}>
                <ProductVisual productId={product.id} accent={chrome} />
            </div>
        </article>
    );
}
