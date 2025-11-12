"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          Zaza <span className="text-pink-500">Draft</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/#features">Our Solutions</Link>
          <Link href="/learning-centre">Learning Centre</Link>
          <Link href="/why-zaza-draft">Why Zaza Draft?</Link>
          <Link href="/about">About Us</Link>
        </nav>
        <div className="flex gap-2">
          <Link href="https://zazateach.com" className="hidden sm:block">
            <Button variant="ghost">Try Zaza Teach</Button>
          </Link>
          <Link href="/join-waitlist">
            <Button>Join Waitlist</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
