"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"

interface TOCItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  items: TOCItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0px -35% 0px" },
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setIsOpen(false)
    }
  }

  return (
    <div className="mb-12">
      {/* Mobile: Collapsible */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-[#1E293B] border border-white/10 rounded-lg p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
        >
          <span className="font-semibold text-white">On this page</span>
          <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? "rotate-90" : ""}`} />
        </button>
        {isOpen && (
          <div className="mt-2 bg-[#1E293B] border border-white/10 rounded-lg p-4 space-y-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                  activeId === item.id
                    ? "bg-[#8B5CF6]/20 text-[#A78BFA] border-l-2 border-[#8B5CF6]"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
                style={{ paddingLeft: `${item.level * 12 + 12}px` }}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop: Always visible */}
      <div className="hidden lg:block bg-[#1E293B] border border-white/10 rounded-lg p-6">
        <h3 className="font-semibold text-white mb-4">On this page</h3>
        <nav className="space-y-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-3 py-2 rounded transition-colors text-sm ${
                activeId === item.id
                  ? "bg-[#8B5CF6]/20 text-[#A78BFA] border-l-2 border-[#8B5CF6]"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
              style={{ paddingLeft: `${item.level * 12 + 12}px` }}
            >
              <span className="flex items-center gap-2">
                <ChevronRight className="h-3 w-3 flex-shrink-0" />
                {item.title}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
