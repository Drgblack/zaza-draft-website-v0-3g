import { Fragment } from "react";

/**
 * Next.js will call this when rendering MDX.
 * We provide safe fallbacks for common capitalized components that might appear in content
 * without explicit imports, preventing "ReferenceError: Header is not defined" during prerender.
 */
export function useMDXComponents(components: Record<string, any>) {
  return {
    // Safe fallbacks for potentially referenced components in MDX/content
    Header: (props: any) => <div {...props} />,
    Footer: (props: any) => <div {...props} />,
    LanguageProvider: ({ children, ...rest }: any) => <Fragment {...rest}>{children}</Fragment>,

    // You can add more shims here if needed:
    // Hero: (props: any) => <div {...props} />,
    // Callout: (props: any) => <blockquote {...props} />,

    // Always keep user-provided components last so they override our fallbacks
    ...components,
  };
}
