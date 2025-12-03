"use client"

import { Lightbulb } from "lucide-react"

interface QuickAnswerBoxProps {
  answer: string
}

export function QuickAnswerBox({ answer }: QuickAnswerBoxProps) {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="bg-[#1E293B] border-l-4 border-[#8B5CF6] rounded-lg p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-[#A78BFA]" />
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-[#A78BFA] uppercase tracking-wide mb-2">Quick Answer</div>
            <p className="text-[#F9FAFB] text-base md:text-lg leading-relaxed">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

