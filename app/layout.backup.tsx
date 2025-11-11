import type { Metadata } from "next";
import "./globals.css";
import ExitIntentMount from "@/components/exit-intent-mount";

export const metadata: Metadata = {
  title: "Zaza Draft",
  description: "Teacher-first AI writing assistant",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <ExitIntentMount />
      </body>
    </html>
  );
}