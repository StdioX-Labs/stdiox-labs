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
        <Script id="mixpanel" strategy="afterInteractive">
          {`
            (function(e,c){if(!c.__SV){var l,h;window.mixpanel=c;c._i=[];c.init=function(q,r,f){function t(d,a){var g=a.split(".");2==g.length&&(d=d[g[0]],a=g[1]);d[a]=function(){d.push([a].concat(Array.prototype.slice.call(arguments,0)))}}var b=c;"undefined"!==typeof f?b=c[f]=[]:f="mixpanel";b.people=b.people||[];b.toString=function(d){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);d||(a+=" (stub)");return a};b.people.toString=function(){return b.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders start_session_recording stop_session_recording people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
            for(h=0;h<l.length;h++)t(b,l[h]);var n="set set_once union unset remove delete".split(" ");b.get_group=function(){function d(p){a[p]=function(){b.push([g,[p].concat(Array.prototype.slice.call(arguments,0))])}}for(var a={},g=["get_group"].concat(Array.prototype.slice.call(arguments,0)),m=0;m<n.length;m++)d(n[m]);return a};c._i.push([q,r,f])};c.__SV=1.2;var k=e.createElement("script");k.type="text/javascript";k.async=!0;k.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===
            e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";e=e.getElementsByTagName("script")[0];e.parentNode.insertBefore(k,e)}})(document,window.mixpanel||[])
            mixpanel.init('23254066d6d367be39a750652a3d8fe8', {
              autocapture: true,
              record_sessions_percent: 100,
              api_host: 'https://api-eu.mixpanel.com',
            })
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
