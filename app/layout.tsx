import type React from "react"
import LocaleSwitchClient from "components/LocaleSwitchClient";
import type { Metadata } from "next"
import LocaleSwitchClient from "components/LocaleSwitchClient";
import { Inter } from "next/font/google"
import LocaleSwitchClient from "components/LocaleSwitchClient";
import "./globals.css"
import LocaleSwitchClient from "components/LocaleSwitchClient";
import { Header } from "@/components/header"
import LocaleSwitchClient from "components/LocaleSwitchClient";
import { Footer } from "@/components/footer"
import LocaleSwitchClient from "components/LocaleSwitchClient";
import { LanguageProvider } from "@/lib/i18n/language-context"
import LocaleSwitchClient from "components/LocaleSwitchClient";
import { Analytics } from "@/components/analytics"
import LocaleSwitchClient from "components/LocaleSwitchClient";
import { Suspense } from "react"
import LocaleSwitchClient from "components/LocaleSwitchClient";
import { ExitIntentProvider } from "@/components/exit-intent-provider"
import LocaleSwitchClient from "components/LocaleSwitchClient";
import { SignupModalProvider } from "@/components/signup-modal-provider"
import LocaleSwitchClient from "components/LocaleSwitchClient";
import { ImageErrorHandler } from "@/components/image-error-handler"
import LocaleSwitchClient from "components/LocaleSwitchClient";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
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

