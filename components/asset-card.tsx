"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface AssetCardProps {
  title: string
  description: string
  previewImage?: string
  downloadUrl: string
  downloadLabel: string
  onClick?: () => void
}

export function AssetCard({ title, description, previewImage, downloadUrl, downloadLabel, onClick }: AssetCardProps) {
  const handleDownload = () => {
    if (onClick) {
      onClick()
    } else {
      window.open(downloadUrl, "_blank")
    }
  }

  return (
    <div className="group relative bg-[#1F2937] rounded-2xl p-6 border border-[#374151] hover:border-[#7C3AED]/50 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-[#7C3AED]/10">
      {previewImage && (
        <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden bg-[#111827]">
          <Image src={previewImage || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-[#F9FAFB] mb-2">{title}</h3>
      <p className="text-sm text-[#9CA3AF] mb-4">{description}</p>
      <Button
        onClick={handleDownload}
        className="w-full bg-gradient-to-r from-[#7C3AED] to-[#6366F1] hover:from-[#6D28D9] hover:to-[#4F46E5] text-white rounded-xl transition-all"
      >
        <Download className="w-4 h-4 mr-2" />
        {downloadLabel}
      </Button>
    </div>
  )
}

