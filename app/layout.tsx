import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "StdioX Labs - Africa's Tech Powerhouse",
    template: "%s | StdioX Labs",
  },
  description: "Solving African problems with cutting-edge technology. Innovation, Impact, Intelligence. Building the future of tech in Africa.",
  keywords: [
    "StdioX Labs",
    "African technology",
    "innovation",
    "software development",
    "tech solutions",
    "AI",
    "machine learning",
    "blockchain",
    "fintech",
    "Africa tech",
    "digital transformation",
  ],
  authors: [{ name: "StdioX Labs" }],
  creator: "StdioX Labs",
  publisher: "StdioX Labs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stdiox-labs.vercel.app",
    siteName: "StdioX Labs",
    title: "StdioX Labs - Africa's Tech Powerhouse",
    description: "Solving African problems with cutting-edge technology. Innovation, Impact, Intelligence.",
    images: [
      {
        url: "/stdiox.png",
        width: 1200,
        height: 630,
        alt: "StdioX Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StdioX Labs - Africa's Tech Powerhouse",
    description: "Solving African problems with cutting-edge technology. Innovation, Impact, Intelligence.",
    images: ["/stdiox.png"],
    creator: "@stdiox_labs",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: "G-EN85ECBHF2",
  },
  category: "technology",
  metadataBase: new URL("https://stdiox-labs.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-EN85ECBHF2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EN85ECBHF2');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
