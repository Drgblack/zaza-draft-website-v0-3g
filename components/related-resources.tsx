import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, type LucideIcon } from "lucide-react"

interface RelatedResource {
  title: string
  description: string
  href: string
  icon: LucideIcon
  color: string
}

interface RelatedResourcesProps {
  title?: string
  description?: string
  resources: RelatedResource[]
}

export function RelatedResources({ title = "Related Resources", description, resources }: RelatedResourcesProps) {
  return (
    <section className="py-20 bg-[#0F172A] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
          {description && <p className="text-xl text-gray-300 max-w-3xl mx-auto">{description}</p>}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => {
            const Icon = resource.icon
            return (
              <Link
                key={resource.href}
                href={resource.href}
                className="bg-[#1E293B] border border-white/10 rounded-xl p-8 hover:border-[#8B5CF6] transition-all hover:shadow-xl hover:shadow-[#8B5CF6]/20 group"
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${resource.color}20` }}
                >
                  <Icon className="w-8 h-8" style={{ color: resource.color }} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#A78BFA] transition-colors">
                  {resource.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{resource.description}</p>
                <Button className="w-full bg-[#8B5CF6]/10 hover:bg-[#8B5CF6] text-[#A78BFA] hover:text-white border border-[#8B5CF6]/30 group-hover:border-[#8B5CF6]">
                  Explore
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

