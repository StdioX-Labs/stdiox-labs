import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "SoldOutAfrica, event and SME prefinancing, white-label ticketing, the Ticketing API, StdioX Pay, Looker, Score, StdioX Comms, StdioX CRM and StdioX Bookings.",
};

export default function ProductsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
