import type { ReactNode } from 'react';

// Illustrative product UI mockups. Figures shown are sample data, not live metrics.

type Accent = [string, string];

const gradient = (accent: Accent, angle = 135) => `linear-gradient(${angle}deg, ${accent[0]}, ${accent[1]})`;

function Window({ title, accent, children }: { title: string; accent: Accent; children: ReactNode }) {
    return (
        <div className="relative">
            {/* Glow */}
            <div
                className="absolute -inset-6 opacity-30 blur-3xl rounded-[2rem] pointer-events-none"
                style={{ background: gradient(accent) }}
            />
            <div className="relative rounded-xl border border-white/15 bg-[#0b0b0f]/95 shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="ml-3 text-[11px] text-gray-400 font-mono truncate">{title}</span>
                </div>
                <div className="p-5 text-xs text-gray-300">{children}</div>
            </div>
        </div>
    );
}

function Meter({ value, accent }: { value: number; accent: Accent }) {
    return (
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${value}%`, background: gradient(accent, 90) }} />
        </div>
    );
}

function Code({ lines }: { lines: [string, string?][] }) {
    return (
        <pre className="font-mono text-[11px] leading-relaxed whitespace-pre-wrap break-all">
            {lines.map(([text, tone], i) => (
                <div key={i} className={tone ?? 'text-gray-300'}>{text}</div>
            ))}
        </pre>
    );
}

function TicketingDashboard({ accent }: { accent: Accent }) {
    const bars = [18, 26, 22, 40, 34, 58, 72, 64, 88, 96, 80, 92];
    return (
        <Window title="organiser.soldoutafrica.com" accent={accent}>
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest">Gross sales · live</p>
                    <p className="text-2xl font-bold text-white mt-1">KES 4,820,500</p>
                </div>
                <span className="px-2 py-1 rounded-full text-[10px] font-semibold text-black" style={{ background: gradient(accent) }}>
                    ON SALE
                </span>
            </div>
            <div className="flex items-end gap-1.5 h-24 mb-5">
                {bars.map((h, i) => (
                    <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: gradient(accent, 180), opacity: 0.35 + (i / bars.length) * 0.65 }} />
                ))}
            </div>
            <div className="space-y-3">
                {[
                    { tier: 'Early Bird', sold: 100 },
                    { tier: 'Regular', sold: 74 },
                    { tier: 'VIP', sold: 41 },
                ].map((row) => (
                    <div key={row.tier}>
                        <div className="flex justify-between mb-1">
                            <span>{row.tier}</span>
                            <span className="text-gray-500">{row.sold === 100 ? 'Sold out' : `${row.sold}%`}</span>
                        </div>
                        <Meter value={row.sold} accent={accent} />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-5 text-center">
                {[['M-Pesa', '72%'], ['Card', '21%'], ['Mobile money', '7%']].map(([k, v]) => (
                    <div key={k} className="rounded-lg border border-white/10 py-2">
                        <p className="text-white font-semibold">{v}</p>
                        <p className="text-gray-500 text-[10px]">{k}</p>
                    </div>
                ))}
            </div>
        </Window>
    );
}

function WhiteLabelStore({ accent }: { accent: Accent }) {
    return (
        <Window title="tickets.yourbrand.com" accent={accent}>
            <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-white tracking-wide">YOUR BRAND</span>
                <div className="flex gap-3 text-gray-500 text-[10px]">
                    <span>Events</span><span>Venues</span><span>My tickets</span>
                </div>
            </div>
            <div className="rounded-lg p-5 mb-4 text-black" style={{ background: gradient(accent) }}>
                <p className="text-[10px] uppercase tracking-widest font-semibold opacity-70">Featured</p>
                <p className="text-lg font-bold mt-1">Summer Series Finale</p>
                <p className="text-[11px] mt-1 opacity-80">Sat · Main Arena · From KES 1,500</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
                {['Comedy Night', 'Jazz Brunch', 'Food Fest'].map((name, i) => (
                    <div key={name} className="rounded-lg border border-white/10 overflow-hidden">
                        <div className="h-12" style={{ background: gradient(accent, 45 + i * 60), opacity: 0.5 }} />
                        <p className="px-2 py-1.5 text-[10px] text-white truncate">{name}</p>
                    </div>
                ))}
            </div>
            <p className="mt-4 text-center text-[10px] text-gray-600">Powered by SoldOutAfrica</p>
        </Window>
    );
}

function TicketingApi({ accent }: { accent: Accent }) {
    return (
        <Window title="POST /v1/orders" accent={accent}>
            <Code
                lines={[
                    ['curl https://api.soldoutafrica.com/api/v1/orders \\', 'text-gray-500'],
                    ['  -H "Authorization: Bearer sk_live_…" \\', 'text-gray-500'],
                    ['  -d \'{ "event": "evt_9f2c", "tier": "vip",', 'text-gray-300'],
                    ['       "qty": 2, "pay_with": "mpesa" }\'', 'text-gray-300'],
                    [''],
                    ['200 OK', 'text-green-400'],
                    ['{', 'text-gray-400'],
                    ['  "order": "ord_7Hk2",', 'text-white'],
                    ['  "status": "awaiting_payment",', 'text-white'],
                    ['  "stk_push": "sent",', 'text-white'],
                    ['  "tickets": ["tkt_A1", "tkt_A2"]', 'text-white'],
                    ['}', 'text-gray-400'],
                ]}
            />
            <div className="mt-4 h-1 rounded-full" style={{ background: gradient(accent, 90) }} />
        </Window>
    );
}

function PayCheckout({ accent }: { accent: Accent }) {
    return (
        <Window title="StdioX Pay · checkout" accent={accent}>
            <div className="flex justify-between items-end mb-5">
                <div>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest">Amount due</p>
                    <p className="text-2xl font-bold text-white mt-1">USD 120.00</p>
                </div>
                <p className="text-gray-500 text-[10px]">≈ KES 15,480 · live rate</p>
            </div>
            <div className="space-y-2.5">
                <div className="rounded-lg border border-white/15 px-3 py-2.5 flex justify-between">
                    <span className="text-gray-400 font-mono">•••• •••• •••• 4242</span>
                    <span className="text-white font-semibold">VISA</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                    <div className="rounded-lg border border-white/15 px-3 py-2.5 text-gray-500 font-mono">MM / YY</div>
                    <div className="rounded-lg border border-white/15 px-3 py-2.5 text-gray-500 font-mono">CVC</div>
                </div>
            </div>
            <div className="mt-5 rounded-lg py-3 text-center font-semibold text-black" style={{ background: gradient(accent, 90) }}>
                Pay securely
            </div>
            <p className="mt-3 text-center text-gray-600 text-[10px]">3-D Secure · Screened by Looker</p>
        </Window>
    );
}

function LookerDecision({ accent }: { accent: Accent }) {
    const score = 79;
    return (
        <Window title="POST /v1/screen" accent={accent}>
            <div className="flex items-center gap-5 mb-5">
                <div
                    className="relative w-20 h-20 rounded-full grid place-items-center shrink-0"
                    style={{ background: `conic-gradient(${accent[0]} 0 ${score}%, rgba(255,255,255,0.08) ${score}% 100%)` }}
                >
                    <div className="absolute inset-2 rounded-full bg-[#0b0b0f] grid place-items-center">
                        <span className="text-xl font-bold text-white">{score}</span>
                    </div>
                </div>
                <div>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest">Decision · 14 ms</p>
                    <p className="text-xl font-bold text-red-400 mt-1">DECLINE</p>
                    <p className="text-gray-500">Risk band: high</p>
                </div>
            </div>
            <div className="space-y-2">
                {[
                    ['GEO_TRIPLE_MISMATCH', '+10.5'],
                    ['CVV_MISMATCH', '+8.96'],
                    ['VELOCITY_CARD_1H', '+7.20'],
                ].map(([code, pts]) => (
                    <div key={code} className="flex justify-between rounded-md bg-white/[0.04] px-3 py-2 font-mono text-[11px]">
                        <span className="text-gray-300">{code}</span>
                        <span style={{ color: accent[0] }}>{pts}</span>
                    </div>
                ))}
            </div>
            <p className="mt-4 text-gray-600 text-[10px]">Evidence pack retained for chargeback defence</p>
        </Window>
    );
}

function ScoreLoan({ accent }: { accent: Accent }) {
    return (
        <Window title="score · loan application" accent={accent}>
            <div className="space-y-2 mb-5">
                {[
                    ['ID document verified', '✓'],
                    ['Face match', '98.4%'],
                    ['Credit bureau check', 'Clear'],
                    ['Affordability', 'Pass'],
                ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-400">{k}</span>
                        <span className="text-white font-semibold">{v}</span>
                    </div>
                ))}
            </div>
            <div className="rounded-lg p-4 text-black" style={{ background: gradient(accent) }}>
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest font-semibold opacity-70">Decision</p>
                        <p className="text-lg font-bold">Approved</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest font-semibold opacity-70">Limit</p>
                        <p className="text-lg font-bold">KES 50,000</p>
                    </div>
                </div>
            </div>
            <p className="mt-3 text-gray-600 text-[10px]">Posted to core ledger · automated in 2.1 s</p>
        </Window>
    );
}

function CommsChat({ accent }: { accent: Accent }) {
    return (
        <Window title="WhatsApp · AI agent" accent={accent}>
            <div className="space-y-2.5">
                <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2">Hi, is my order for Saturday confirmed?</div>
                <div className="max-w-[85%] ml-auto rounded-2xl rounded-br-sm px-3 py-2 text-black" style={{ background: gradient(accent) }}>
                    Yes! Order #7Hk2 is paid — 2 VIP tickets. Want them sent here as QR codes?
                </div>
                <div className="max-w-[40%] rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2">Yes please</div>
                <div className="ml-auto max-w-[60%] rounded-lg border border-dashed border-white/20 px-3 py-2 font-mono text-[10px] text-gray-400">
                    tool: get_tickets(ord_7Hk2) ✓
                </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-5 text-center">
                {[['SMS', 'Delivered'], ['Email', 'Opened'], ['WhatsApp', 'Read']].map(([k, v]) => (
                    <div key={k} className="rounded-lg border border-white/10 py-2">
                        <p className="text-white font-semibold">{k}</p>
                        <p className="text-[10px]" style={{ color: accent[0] }}>{v}</p>
                    </div>
                ))}
            </div>
        </Window>
    );
}

function CrmProfile({ accent }: { accent: Accent }) {
    const points = [12, 18, 15, 26, 22, 34, 30, 42, 48, 44, 58, 64];
    const path = points.map((p, i) => `${(i / (points.length - 1)) * 200},${70 - p}`).join(' L ');
    return (
        <Window title="crm · contact" accent={accent}>
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full grid place-items-center font-bold text-black" style={{ background: gradient(accent) }}>
                    WK
                </div>
                <div>
                    <p className="text-white font-semibold text-sm">Wanjiku K.</p>
                    <p className="text-gray-500">Customer since 2024 · Nairobi</p>
                </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
                {['High value', 'Concert-goer', 'WhatsApp opt-in', 'M-Pesa'].map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full border border-white/15 text-[10px]">{tag}</span>
                ))}
            </div>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Lifetime value</p>
            <svg viewBox="0 0 200 70" className="w-full h-16">
                <defs>
                    <linearGradient id="crm-line" x1="0" x2="1">
                        <stop offset="0" stopColor={accent[0]} />
                        <stop offset="1" stopColor={accent[1]} />
                    </linearGradient>
                </defs>
                <path d={`M ${path}`} fill="none" stroke="url(#crm-line)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="mt-3 rounded-md bg-white/[0.04] px-3 py-2 flex justify-between">
                <span>Next action</span>
                <span style={{ color: accent[0] }}>Send VIP presale invite →</span>
            </div>
        </Window>
    );
}

function BookingsCalendar({ accent }: { accent: Accent }) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const booked: Record<string, number[]> = { Mon: [0, 2], Tue: [1], Wed: [0, 1, 3], Thu: [2], Fri: [0, 3] };
    return (
        <Window title="bookings · this week" accent={accent}>
            <div className="grid grid-cols-5 gap-1.5 mb-4">
                {days.map((day) => (
                    <div key={day}>
                        <p className="text-center text-gray-500 text-[10px] mb-1.5">{day}</p>
                        {[0, 1, 2, 3].map((slot) => {
                            const isBooked = booked[day].includes(slot);
                            return (
                                <div
                                    key={slot}
                                    className={`h-7 rounded mb-1.5 ${isBooked ? '' : 'border border-white/10'}`}
                                    style={isBooked ? { background: gradient(accent), opacity: 0.85 } : undefined}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className="rounded-lg border border-white/10 p-3">
                <div className="flex justify-between">
                    <span className="text-white font-semibold">Hair & Styling · 10:00</span>
                    <span style={{ color: accent[0] }}>Confirmed</span>
                </div>
                <p className="text-gray-500 mt-1">Deposit paid via M-Pesa · SMS reminder scheduled</p>
            </div>
        </Window>
    );
}

const visuals: Record<string, (props: { accent: Accent }) => ReactNode> = {
    soldoutafrica: TicketingDashboard,
    'white-label': WhiteLabelStore,
    'ticketing-api': TicketingApi,
    pay: PayCheckout,
    looker: LookerDecision,
    score: ScoreLoan,
    comms: CommsChat,
    crm: CrmProfile,
    bookings: BookingsCalendar,
};

export default function ProductVisual({ productId, accent }: { productId: string; accent: Accent }) {
    const Visual = visuals[productId];
    return Visual ? <Visual accent={accent} /> : null;
}
