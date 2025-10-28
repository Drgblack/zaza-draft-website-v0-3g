﻿import type { Metadata } from "next";
import "../globals.css";
import Providers from "../providers";

export const metadata: Metadata = {
  title: "Zaza Draft",
  description: "Lehrerfreundliche KI-Schreibassistenz",
};

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
