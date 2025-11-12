import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          <span className="text-white">Zaza</span>{" "}
          <span className="text-pink-400">Draft</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/solutions" className="hover:opacity-80">
            Our Solutions
          </Link>
          <Link href="/learning-centre" className="hover:opacity-80">
            Learning Centre
          </Link>
          <Link href="/why-draft" className="hover:opacity-80">
            Why Zaza Draft?
          </Link>
          <Link href="/about" className="hover:opacity-80">
            About Us
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="https://zazateach.com"
            className="rounded-xl border px-3 py-1.5 text-sm hover:bg-white/5"
          >
            Try Zaza Teach
          </a>
          <Link
            href="/waitlist"
            className="rounded-xl bg-pink-500 px-3 py-1.5 text-sm text-white hover:bg-pink-400"
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </header>
  );
}
