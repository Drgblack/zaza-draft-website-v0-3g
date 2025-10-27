import type { Metadata } from "next";
import Providers from "../providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Zaza Draft",
  description: "Lehrerfreundliche KI-Schreibassistenz",
};

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
