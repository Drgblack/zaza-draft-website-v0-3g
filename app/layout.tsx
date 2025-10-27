import "./globals.css";
import Providers from "@/providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zaza Draft",
  description: "Teacher-first AI tools by Zaza.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
