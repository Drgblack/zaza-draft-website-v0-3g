import Link from "next/link";
export default function SiteFooter() {
  return (
    <footer className="border-t mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <div className="font-semibold mb-2">Zaza Technologies</div>
          <div>Gumbertstraße 150, 40229 Düsseldorf, Germany</div>
        </div>
        <div className="space-y-1">
          <Link href="/about">About</Link>
          <br />
          <Link href="/terms">Terms</Link>
          <br />
          <Link href="/privacy">Privacy</Link>
          <br />
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <div className="font-semibold mb-2">Follow us</div>
          <div className="space-x-3">
            <Link href="https://tiktok.com">TikTok</Link>
            <Link href="https://www.linkedin.com/company/zaza-tech">
              LinkedIn
            </Link>
            <Link href="https://x.com">X</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
