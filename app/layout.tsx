import "@/components/mdx-globals";
import { Suspense } from 'react';
import LanguageProvider from "@/components/LanguageProvider";
import { Inter } from 'next/font/google';
import FixedLocaleToggle from "@/components/FixedLocaleToggle";

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










