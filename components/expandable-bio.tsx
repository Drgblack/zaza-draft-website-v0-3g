"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ExpandableBioProps {
  shortBio: string
  longBio: string
  shortLabel: string
  longLabel: string
}

export function ExpandableBio({ shortBio, longBio, shortLabel, longLabel }: ExpandableBioProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-[#1F2937] rounded-2xl p-6 border border-[#374151]">
      <div className="flex gap-2 mb-4">
        <Button
          onClick={() => setExpanded(false)}
          variant={!expanded ? "default" : "ghost"}
          size="sm"
          className={
            !expanded
              ? "bg-gradient-to-r from-[#7C3AED] to-[#6366F1] text-white"
              : "text-[#9CA3AF] hover:text-[#F9FAFB]"
          }
        >
          {shortLabel}
        </Button>
        <Button
          onClick={() => setExpanded(true)}
          variant={expanded ? "default" : "ghost"}
          size="sm"
          className={
            expanded ? "bg-gradient-to-r from-[#7C3AED] to-[#6366F1] text-white" : "text-[#9CA3AF] hover:text-[#F9FAFB]"
          }
        >
          {longLabel}
        </Button>
      </div>
      <div className="text-[#D1D5DB] leading-relaxed">{expanded ? <p>{longBio}</p> : <p>{shortBio}</p>}</div>
    </div>
  )
}

