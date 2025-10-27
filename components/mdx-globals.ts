import * as React from "react";

/**
 * Global MDX fallbacks so stray capitalized tokens in content
 * (e.g., Header, Footer, LanguageProvider) never crash SSR builds.
 * This is safe: if a page imports a real component, it will shadow these.
 */
const g = globalThis as any;

if (!g.Header) {
  g.Header = (props: any) => React.createElement("div", props);
}

if (!g.Footer) {
  g.Footer = (props: any) => React.createElement("div", props);
}

if (!g.LanguageProvider) {
  g.LanguageProvider = ({ children, ...rest }: any) =>
    React.createElement(React.Fragment, rest, children);
}

if (!(globalThis as any).ExitIntentProvider) (globalThis as any).ExitIntentProvider = ({ children, ...rest }: any) => React.createElement(React.Fragment, rest, children);
export {};
