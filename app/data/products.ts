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
        label: 'Events & Ticketing',
        summary: 'The full stack behind an event — from the on-sale to the money that funds it.',
        products: [
            {
                id: 'soldoutafrica',
                name: 'SoldOutAfrica',
                tagline: 'Premier Events Platform',
                description:
                    "Africa's premier events ticketing and merchandising platform. Organizers create an event and start selling the same day, with M-Pesa, card and mobile money, realtime settlement and infrastructure sized for on-sale peaks.",
                url: 'https://soldoutafrica.com/',
                status: 'live',
                features: [
                    'End-to-end ticketing and merchandise',
                    'M-Pesa, card and mobile money checkout',
                    'Realtime settlement to organizers',
                    'Split payments for co-promoters',
                    'Marketing attribution per channel and link',
                    'Event prefinancing from a dedicated capital pool',
                ],
            },
            {
                id: 'soa-organizer',
                name: 'Organizer Dashboard',
                tagline: 'Run the Event, Not the Spreadsheet',
                description:
                    'The control room for SoldOutAfrica organizers: live sales and capacity, ticket tiers, payouts, attendees and check-in — installable as a mobile app.',
                url: 'https://organiser.soldoutafrica.com/',
                status: 'live',
                features: [
                    'Live sales and capacity tracking',
                    'Tier, pricing and inventory management',
                    'Payouts and settlement history',
                    'Installable progressive web app',
                ],
            },
            {
                id: 'tokea',
                name: 'Tokea',
                tagline: 'Discover. Tap. Attend.',
                description:
                    'A consumer-first event discovery and checkout experience. Featured events, quick ticket selection and one-flow payment over M-Pesa and Paystack.',
                url: 'https://tokea.com/',
                status: 'live',
                features: [
                    'Featured events and discovery',
                    'Drawer-based ticket selection',
                    'M-Pesa and Paystack payments',
                    'Shareable order and ticket pages',
                ],
            },
        ],
    },
    {
        id: 'fintech',
        label: 'Payments & Financial Infrastructure',
        summary: 'Moving, protecting and lending money — engineered for African rails.',
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
