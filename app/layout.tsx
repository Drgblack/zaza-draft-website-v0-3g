import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import React from "react";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { Header } from "@/components/header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Zaza Draft",
  description:
    "Teacher-first AI built with educators to calm Sunday night admin - join early access to shape the private beta.",
  metadataBase: new URL("https://zazadraft.com"),
  icons: {
    icon: "/z-logo.png",
    shortcut: "/z-logo.png",
    apple: "/z-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/z-logo.png" sizes="any" />
      </head>
      <body className="bg-slate-950 text-slate-100">
        <Script
          src="https://plausible.io/js/script.js"
          data-domain="zazadraft.com"
          strategy="afterInteractive"
        />
        <LanguageProvider>
          <Header />
          <main className="pt-[92px] bg-slate-950">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
