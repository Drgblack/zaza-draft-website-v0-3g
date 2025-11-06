import type React from "react"
import { cookies } from "next/headers";
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"
import { ExitIntentProvider } from "@/components/exit-intent-provider"
import { SignupModalProvider } from "@/components/signup-modal-provider"
import { ImageErrorHandler } from "@/components/image-error-handler"
import Footer from "../components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Zaza Draft - Write better parent messages in minutes",
  description: "Draft helps teachers produce clear, compassionate, translation-ready comments without hallucinations.",
  openGraph: {
    title: "Zaza Draft - Write better parent messages in minutes",
    description:
      "Draft helps teachers produce clear, compassionate, translation-ready comments without hallucinations.",
    type: "website",
  },
    generator: 'v0.app'
}

const __zazaLocale = (() => {
  try {
    const c = cookies();
    const v = c.get('NEXT_LOCALE')?.value || c.get('locale')?.value || 'en';
    return (v || 'en').toLowerCase();
  } catch { return 'en'; }
})();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={__zazaLocale} className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-[#0B1220] text-[#F9FAFB] font-sans">
        <Suspense fallback={<div>Loading...</div>}>
          <LanguageProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ExitIntentProvider />
            <SignupModalProvider />
          </LanguageProvider>
        </Suspense>
        <Analytics />
        <ImageErrorHandler />
      </body>
    </html>
  )
}
