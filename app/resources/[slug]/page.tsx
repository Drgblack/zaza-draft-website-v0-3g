import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getResourceBySlug, getAllResources } from "@/lib/cms/resources"
import { ArrowLeft, Download } from "lucide-react"

export async function generateStaticParams() {
  const resources = getAllResources()
  return resources.map((resource) => ({
    slug: resource.slug,
  }))
}

export default function ResourcePage({ params }: { params: { slug: string } }) {
  const resource = getResourceBySlug(params.slug)

  if (!resource) {
    notFound()
  }

  return (
    <div className="py-20 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back button */}
        <Link href="/resources">
          <Button variant="ghost" className="mb-8 text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to resources
          </Button>
        </Link>

        {/* Hero image */}
        <div className="relative h-96 w-full rounded-2xl overflow-hidden mb-8 bg-[#0F172A]">
          <Image src={resource.heroImage || "/placeholder.svg"} alt={resource.title} fill className="object-cover" />
        </div>

        {/* Type badge */}
        <Badge variant="secondary" className="bg-[#7C3AED]/10 text-[#7C3AED] border-0 mb-4">
          {resource.type}
        </Badge>

        {/* Title */}
        <h1 className="text-4xl font-bold text-[#F9FAFB] sm:text-5xl mb-6 text-balance">{resource.title}</h1>

        {/* Download button if available */}
        {resource.downloadUrl && (
          <div className="mb-8">
            <Button asChild className="gradient-primary text-white">
              <a href={resource.downloadUrl} download>
                <Download className="mr-2 h-4 w-4" />
                Download
              </a>
            </Button>
          </div>
        )}

        {/* Body */}
        <article className="prose prose-invert prose-lg max-w-none">
          <div
            className="text-[#D1D5DB] leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: resource.body.replace(/\n/g, "<br />") }}
          />
        </article>
      </div>
    </div>
  )
}
