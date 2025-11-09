import { LanguageProvider } from "@/lib/i18n/language-context"

export default function DELayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>
        <LanguageProvider initialLanguage="de">
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
