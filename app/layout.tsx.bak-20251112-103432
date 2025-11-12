import "./globals.css";
import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Zaza Draft",
  description: "Teacher-first, explainable AI for parent messages & comments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#0b1020] text-white">
        <SiteHeader />
        <main className="mx-auto max-w-7xl px-4">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
