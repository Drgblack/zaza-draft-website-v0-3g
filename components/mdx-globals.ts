import * as React from "react";

/**
 * Global MDX fallbacks so capitalized tokens in MDX never crash SSR builds.
 * Safety: never touch non-writable globals and never override real implementations.
 */
const g = globalThis as any;

// Extend this list if a new identifier appears in build errors.
const SAFE_GLOBALS = [
  "Header",
  "Footer",
  "LanguageProvider",
  "ExitIntentProvider",
  "SignupModalProvider",
  "Analytics",
  // add more if needed, e.g. "ConsentManager", "ScriptGate"
];

function defineSafeComponent(name: string) {
  try {
    // Do NOT touch if already a function/component
    if (name in g && typeof g[name] === "function") return;

    // Skip non-writable globals (prevents "Cannot assign to read only property")
    const desc = Object.getOwnPropertyDescriptor(g, name);
    if (desc && desc.writable === false) return;

    // Define as a no-op wrapper (configurable/writable so real imports can shadow)
    Object.defineProperty(g, name, {
      configurable: true,
      writable: true,
      value: ({ children, ...rest }: any) =>
        React.createElement(React.Fragment, rest, children),
    });
  } catch {
    // If anything looks suspicious (e.g., trying to set a host-defined global), skip quietly.
  }
}

for (const key of SAFE_GLOBALS) defineSafeComponent(key);

export {};
