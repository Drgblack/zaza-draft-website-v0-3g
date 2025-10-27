import * as React from "react";

/**
 * Global MDX fallbacks so capitalized tokens in MDX (e.g., Header, *Provider)
 * never crash SSR builds. Real imports will shadow these automatically.
 */
const g = globalThis as any;

// Add/extend this list as needed if new tokens appear in content.
const SAFE_GLOBALS = [
  "Header",
  "Footer",
  "LanguageProvider",
  "ExitIntentProvider",
  "SignupModalProvider",
  // You can add more here if needed:
  // "NewsletterProvider",
  // "ScriptGate",
  // "MarketingProvider",
, "Analytics"];

for (const key of SAFE_GLOBALS) {
  if (!g[key]) {
    // Wrap children without side effects; preserve props passthrough.
    g[key] = ({ children, ...rest }: any) =>
      React.createElement(React.Fragment, rest, children);
  }
}

export {};

