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
        label: 'Ticketing',
        summary: 'For event companies, venues and brands: sell on SoldOutAfrica, under your own brand, or through our API.',
        accent: ['#a78bfa', '#f472b6'],
        products: [
            {
                id: 'soldoutafrica',
                name: 'SoldOutAfrica',
                tagline: 'Ticketing and merchandise for event companies',
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
                id: 'prefinancing',
                name: 'Event Prefinancing',
                tagline: 'Upfront event costs, repaid from ticket sales',
                description:
                    'A SoldOutAfrica offering for organizers selling on the platform. Venue deposits, artist advances and marketing budgets are advanced before on-sale and repaid automatically from ticket revenue as it comes in.',
                url: 'https://soldoutafrica.com/',
                status: 'live',
                features: [
                    'Venue, artist and marketing advances',
                    'Repaid automatically from ticket sales',
                    'Assessed on the event, no collateral',
                    'Sized for stadium shows, not just club nights',
                ],
            },
            {
                id: 'white-label',
                name: 'White-Label Ticketing',
                tagline: 'A ticketing storefront under your own brand',
                description:
                    'A fully branded ticketing storefront for event companies and venues, with your domain, templates and organizer team, running on SoldOutAfrica.',
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
                tagline: 'Ticketing inside your own apps and sites',
                description:
                    'Direct API access to events, inventory, checkout and orders for businesses that want ticketing inside their own apps and sites. Includes a sandbox and enterprise SLAs.',
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
        label: 'Payments and lending',
        summary: 'Collecting payments, screening them for fraud, and lending.',
        accent: ['#34d399', '#a3e635'],
        products: [
            {
                id: 'pay',
                name: 'StdioX Pay',
                tagline: 'Hosted card payments and a collection API',
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
                tagline: 'Fraud screening and chargeback evidence',
                description:
                    'Sits between checkout and the acquirer. For every transaction it decides in milliseconds whether to approve, challenge with 3-D Secure or decline, and keeps the evidence needed to win a dispute.',
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
                tagline: 'Core banking and credit decisions for lenders',
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
        label: 'Messaging and business tools',
        summary: 'Messaging, customer records and appointment booking.',
        accent: ['#38bdf8', '#818cf8'],
        products: [
            {
                id: 'comms',
                name: 'StdioX Comms',
                tagline: 'SMS, email and WhatsApp through one API',
                description:
                    'A single developer API for SMS, transactional and bulk email, and WhatsApp, plus WhatsApp AI agents that answer customers and call your own endpoints.',
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
                tagline: 'One view of every customer',
                description:
                    'Contacts, segments and analytics across products and channels, with actions that trigger campaigns through StdioX Comms.',
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
                tagline: 'Appointments, deposits and reminders',
                description:
                    'Appointment booking for salons, clinics, academies and studios, with staff calendars, M-Pesa and Pesapal deposits, SMS reminders and a built-in website builder.',
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
