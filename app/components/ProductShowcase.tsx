'use client';

import Link from 'next/link';
import ProductVisual from './ProductVisual';
import { statusLabels, type Product } from '../data/products';
import { trackEvent } from '../utils/mixpanel';

interface ProductShowcaseProps {
    product: Product;
    accent: [string, string];
    reverse?: boolean;
    page: string;
}

export default function ProductShowcase({ product, accent, reverse = false, page }: ProductShowcaseProps) {
    const handleClick = () => {
        trackEvent('Product Clicked', {
            product_name: product.name,
            product_url: product.url,
            page: page,
        });
    };

    const ctaClass = 'inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-black transition-all duration-300 hover:gap-5 hover:scale-105';
    const ctaStyle = { fontFamily: 'var(--font-orbitron)', background: `linear-gradient(90deg, ${accent[0]}, ${accent[1]})` };

    return (
        <article
            id={product.id}
            onMouseEnter={() => trackEvent('Product Hovered', { product_name: product.name, page: page })}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center scroll-mt-28"
        >
            <div className={reverse ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-3 mb-4">
                    <span
                        className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest border"
                        style={{ borderColor: `${accent[0]}80`, color: accent[0] }}
                    >
                        {statusLabels[product.status]}
                    </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-orbitron)' }}>
                    {product.name}
                </h3>
                <p
                    className="text-lg md:text-xl font-semibold mb-6 bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(90deg, ${accent[0]}, ${accent[1]})` }}
                >
                    {product.tagline}
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">{product.description}</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-10">
                    {product.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-gray-400">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent[0] }} />
                            {feature}
                        </li>
                    ))}
                </ul>
                {product.url ? (
                    <a href={product.url} target="_blank" rel="noopener noreferrer" onClick={handleClick} className={ctaClass} style={ctaStyle}>
                        Visit Platform <span>→</span>
                    </a>
                ) : (
                    <Link href="/contact" onClick={handleClick} className={ctaClass} style={ctaStyle}>
                        {product.status === 'early-access' ? 'Join Early Access' : 'Request a Demo'} <span>→</span>
                    </Link>
                )}
            </div>
            <div className={reverse ? 'lg:order-1' : ''}>
                <ProductVisual productId={product.id} accent={accent} />
            </div>
        </article>
    );
}
