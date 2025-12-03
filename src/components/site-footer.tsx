export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <p className="font-semibold">Zaza Technologies</p>
          <p className="opacity-70 mt-2">
            Gumbertstraße 150, 40229 Düsseldorf, Germany
          </p>
        </div>
        <div className="flex gap-6">
          <a href="/about/company" className="hover:opacity-80">
            About
          </a>
          <a href="/legal/terms" className="hover:opacity-80">
            Terms
          </a>
          <a href="/legal/privacy" className="hover:opacity-80">
            Privacy
          </a>
          <a href="/contact" className="hover:opacity-80">
            Contact
          </a>
        </div>
        <div className="md:text-right">
          <p className="opacity-70">Follow us</p>
          <div className="mt-2 flex md:justify-end gap-3">
            <a
              href="https://www.tiktok.com"
              aria-label="TikTok"
              className="hover:opacity-80"
            >
              TikTok
            </a>
            <a
              href="https://www.linkedin.com"
              aria-label="LinkedIn"
              className="hover:opacity-80"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              aria-label="X"
              className="hover:opacity-80"
            >
              X
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

