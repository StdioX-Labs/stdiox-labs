import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Funding — Event Prefinancing",
  description: "We prefinance events through SoldOutAfrica: venue deposits, artist advances and marketing fronted from a dedicated capital pool, repaid automatically from ticket sales.",
};

export default function FundingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
