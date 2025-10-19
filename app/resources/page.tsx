"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import { Download } from "lucide-react"
import { getAllResources, type Resource } from "@/lib/cms/resources"

export default function ResourcesPage() {
  const { language } = useLanguage()
  const [filter, setFilter] = useState<"All" | Resource["type"]>("All")

  const allResources = getAllResources()
  const filteredResources = filter === "All" ? allResources : allResources.filter((r) => r.type === filter)

  const types: Array<{ value: "All" | Resource["type"]; label: string }> = [
    { value: "All", label: "All" },
    { value: "Guide", label: "Guides" },
    { value: "Template", label: "Templates" },
    { value: "Checklist", label: "Checklists" },
  ]

  return (
    <div className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-4xl font-bold text-[#F9FAFB] sm:text-5xl mb-4">Free Resources for Teachers</h1>
          <p className="text-xl text-[#D1D5DB]">
            Download ready-to-use templates, guides, and checklists to save time and reduce stress in your teaching.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {types.map((type) => (
            <Button
              key={type.value}
              onClick={() => setFilter(type.value)}
              variant={filter === type.value ? "default" : "outline"}
              className={
                filter === type.value
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                  : "border-[#1F2937] bg-transparent text-[#D1D5DB] hover:bg-[#1F2937] hover:text-[#F9FAFB]"
              }
            >
              {type.label}
            </Button>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="mx-auto max-w-2xl mb-12">
            <Card className="bg-[#111827] border-[#1F2937] p-6">
              <p className="text-[#9CA3AF] text-center">No resources found.</p>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => {
            const isCurrentLanguage = resource.language.toLowerCase() === language.toLowerCase()

            return (
              <Card
                key={resource.slug}
                className="bg-[#111827] border-[#1F2937] overflow-hidden hover:border-[#7C3AED]/50 transition-all h-full flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <Badge variant="secondary" className="bg-[#7C3AED]/10 text-[#7C3AED] border-0">
                      {resource.type}
                    </Badge>
                    {!isCurrentLanguage && (
                      <Badge variant="outline" className="border-[#60A5FA]/30 text-[#60A5FA] text-xs">
                        {resource.language.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-[#F9FAFB] mb-3 line-clamp-2">{resource.title}</h2>
                  <p className="text-[#9CA3AF] line-clamp-3 flex-1 mb-4">{resource.excerpt}</p>

                  {resource.published && (
                    <p className="text-sm text-[#6B7280] mb-4">
                      Published: {new Date(resource.published).toLocaleDateString()}
                    </p>
                  )}

                  {(resource.files?.en?.pdf ?? resource.files?.en?.docx ?? resource.files?.de?.pdf ?? resource.files?.de?.docx) ? (
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all"
                    >
                      <a href=(resource.files?.en?.pdf ?? resource.files?.en?.docx ?? resource.files?.de?.pdf ?? resource.files?.de?.docx) download className="flex items-center justify-center gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  ) : (
                    <Button disabled className="w-full bg-[#1F2937] text-[#9CA3AF] cursor-not-allowed">
                      Coming Soon
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

