export type ProductStatus = 'live' | 'enterprise' | 'early-access';

export interface Product {
    id: string;
    name: string;
    tagline: string;
    description: string;
    url: string | null;
    status: ProductStatus;
    features: string[];
}

export interface ProductCategory {
    id: string;
    label: string;
    summary: string;
    /** Gradient stops used for this category's accents. */
    accent: [string, string];
    products: Product[];
}

export const statusLabels: Record<ProductStatus, string> = {
    live: 'Live',
    enterprise: 'Enterprise',
    'early-access': 'Early Access',
};

export const productCategories: ProductCategory[] = [
    {
        id: 'events',
        label: 'Ticketing for Business',
        summary: 'Ticketing infrastructure for event companies, venues and brands — on our platform, under your brand, or through our API.',
        accent: ['#a78bfa', '#f472b6'],
        products: [
            {
                id: 'soldoutafrica',
                name: 'SoldOutAfrica',
                tagline: 'The Ticketing Platform',
                description:
                    'The ticketing and merchandise platform event companies run their sales on. Go live the same day with M-Pesa, card and mobile money, realtime settlement, and infrastructure sized for on-sale peaks.',
                url: 'https://soldoutafrica.com/',
                status: 'live',
                features: [
                    'Ticketing, merchandise and check-in',
                    'M-Pesa, card and mobile money checkout',
                    'Realtime settlement and split payouts',
                    'Organizer dashboard with live sales',
                    'Marketing attribution per channel',
                    'Event prefinancing from a capital pool',
                ],
            },
            {
                id: 'white-label',
                name: 'White-Label Ticketing',
                tagline: 'Your Brand. Our Engine.',
                description:
                    'A fully branded ticketing storefront for event companies and venues — your domain, your templates, your organizer team — running on the SoldOutAfrica engine.',
                url: null,
                status: 'enterprise',
                features: [
                    'Custom domain and branding',
                    'Multiple organizer accounts',
                    'Promo codes, flash sales and gift cards',
                    'Automated reconciliation and reports',
                ],
            },
            {
                id: 'ticketing-api',
                name: 'Ticketing API',
                tagline: 'Ticketing Inside Your Product',
                description:
                    'Direct API access to events, inventory, checkout and orders for businesses that want ticketing inside their own apps and sites — with a sandbox and enterprise SLAs.',
                url: null,
                status: 'enterprise',
                features: [
                    'Events, inventory and orders API',
                    'Hosted M-Pesa and card checkout',
                    'Sandbox testing environment',
                    'Integration support and SLAs',
                ],
            },
        ],
    },
    {
        id: 'fintech',
        label: 'Payments & Financial Infrastructure',
        summary: 'Moving, protecting and lending money — engineered for African rails.',
        accent: ['#34d399', '#a3e635'],
        products: [
            {
                id: 'pay',
                name: 'StdioX Pay',
                tagline: 'Card Collection, Done Right',
                description:
                    'Hosted payment pages and a collection API for card and cross-border payments, with live exchange rates and signed callbacks into your system.',
                url: null,
                status: 'enterprise',
                features: [
                    'Hosted card payment forms',
                    'Multi-country, multi-currency checkout',
                    'Live exchange rates',
                    'Callback and completion webhooks',
                ],
            },
            {
                id: 'looker',
                name: 'Looker',
                tagline: 'Fraud Screening & Chargeback Defence',
                description:
                    'Sits between checkout and the acquirer. For every transaction it decides in milliseconds — approve, challenge with 3-D Secure, or decline — and keeps the evidence needed to win the dispute.',
                url: null,
                status: 'enterprise',
                features: [
                    'Pre-authorisation risk scoring',
                    'Explainable decisions with reason codes',
                    'Merchant-configurable rules',
                    'Device bans and card-testing detection',
                ],
            },
            {
                id: 'score',
                name: 'Score',
                tagline: 'Core Banking & Credit Decisioning',
                description:
                    'A lending stack for digital lenders and SACCOs: onboarding with KYC and face verification, credit scoring and automated loan decisions on top of a full core banking ledger.',
                url: null,
                status: 'enterprise',
                features: [
                    'Digital onboarding and KYC',
                    'Face comparison and document verification',
                    'Credit scoring and bureau checks',
                    'Automated loan decisioning and core ledger',
                ],
            },
        ],
    },
    {
        id: 'business',
        label: 'Communications & Business Software',
        summary: 'The everyday tools businesses run on — reach, customers and bookings.',
        accent: ['#38bdf8', '#818cf8'],
        products: [
            {
                id: 'comms',
                name: 'StdioX Comms',
                tagline: 'SMS, Email & WhatsApp — One API',
                description:
                    'A single developer API for SMS, transactional and bulk email, and WhatsApp — plus WhatsApp AI agents that answer customers and call your own endpoints.',
                url: null,
                status: 'live',
                features: [
                    'Single and bulk SMS with delivery reports',
                    'Transactional and bulk email',
                    'WhatsApp messaging with rich media',
                    'AI agents with custom tools and models',
                ],
            },
            {
                id: 'crm',
                name: 'StdioX CRM',
                tagline: 'Customer Intelligence Platform',
                description:
                    'One view of every customer across products and channels — contacts, segments, analytics and actions that trigger campaigns through StdioX Comms.',
                url: null,
                status: 'early-access',
                features: [
                    'Unified contact profiles',
                    'Segmentation and analytics',
                    'Automated actions and campaigns',
                    'Team roles and permissions',
                ],
            },
            {
                id: 'bookings',
                name: 'StdioX Bookings',
                tagline: 'Appointments, Payments & Your Website',
                description:
                    'Appointment booking for salons, clinics, academies and studios — staff calendars, deposits via M-Pesa and Pesapal, SMS reminders and a built-in website builder.',
                url: null,
                status: 'early-access',
                features: [
                    'Online booking and staff calendars',
                    'M-Pesa and Pesapal deposits',
                    'SMS and email reminders',
                    'Built-in website builder',
                ],
            },
        ],
    },
];

export const allProducts = productCategories.flatMap((category) => category.products);
