import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "SoldOutAfrica, white-label ticketing, Ticketing API, StdioX Pay, Looker, Score, StdioX Comms, StdioX CRM and StdioX Bookings — ticketing, payments, lending and communications built for Africa.",
};

export default function ProductsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
