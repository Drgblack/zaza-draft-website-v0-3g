"use client"

import { useLanguage } from "@/lib/i18n/language-context"

const badgeKeys = [
  "socialProof.badges.teacherFounded",
  "socialProof.badges.gdprReady",
  "socialProof.badges.teacherFeedback",
  "socialProof.badges.hallucinationSafe",
] as const

export function SocialProofBadges() {
  const { t } = useLanguage()

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
      {badgeKeys.map((key) => (
        <span
          key={key}
          className="inline-flex items-center rounded-full border border-[#374151] px-3 py-1 text-xs text-[#D1D5DB] bg-[#020617]/60 transition-colors duration-150 hover:border-[#8B5CF6] hover:text-white"
        >
          {t(key)}
        </span>
      ))}
    </div>
  )
}

