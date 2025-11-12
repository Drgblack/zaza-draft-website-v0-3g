export default function SiteFooter() {
  return (
    <footer className="w-full border-t mt-12">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
        <div>Zaza Technologies UG (haftungsbeschränkt)</div>
        <div>Gumbertstraße 150, 40229 Düsseldorf, Germany</div>
        <div className="mt-2">
          &copy; {new Date().getFullYear()} Zaza. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
