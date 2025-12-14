export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm opacity-80">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="font-semibold mb-2">Zaza Technologies</div>
            <div>Gumbertstraáe 150, 40229 Dsseldorf, Germany</div>
            <p className="mt-3 text-xs text-gray-300/90 italic">
              Made with 💙 by teachers, for teachers.
            </p>
          </div>
          <div className="flex gap-4">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="text-right">¸ {new Date().getFullYear()} Zaza</div>
        </div>
      </div>
    </footer>
  )
}
