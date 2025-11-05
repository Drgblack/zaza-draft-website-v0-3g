import type { Metadata } from "next"
import { AboutSidebar } from "@/components/about-sidebar"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { AssetCard } from "@/components/asset-card"
import { ExpandableBio } from "@/components/expandable-bio"
import { Button } from "@/components/ui/button"
import { Mail, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Press Kit – Zaza Draft",
  description:
    "Download logos, screenshots, brand guidelines, and founder bio for Zaza Draft. Media resources for journalists and partners.",
}

export default function PressKitPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-[#F9FAFB]">
      <div className="max-w-screen-2xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-[280px_1fr] gap-12">
          <aside className="hidden lg:block">
            <AboutSidebar />
          </aside>

          <main>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Press Kit", href: "/about/press" },
              ]}
            />

            {/* Hero */}
            <div className="mt-8 mb-16">
              <p className="text-sm font-medium text-[#A78BFA] uppercase tracking-wider mb-4">Press Kit</p>
              <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">Zaza Draft Press Kit</h1>
              <p className="text-xl text-[#9CA3AF] max-w-3xl">Logos, screenshots, and brand assets for media use.</p>
            </div>

            {/* Brand Logos */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Brand Logos</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AssetCard
                  title="Primary Logo (Light)"
                  description="Zaza Draft logo for light backgrounds. PNG format, transparent background."
                  previewImage="/press-kit/logo-light-preview.jpg"
                  downloadUrl="/press-kit/zaza-draft-logo-light.png"
                  downloadLabel="Download PNG"
                />
                <AssetCard
                  title="Primary Logo (Dark)"
                  description="Zaza Draft logo for dark backgrounds. PNG format, transparent background."
                  previewImage="/press-kit/logo-dark-preview.jpg"
                  downloadUrl="/press-kit/zaza-draft-logo-dark.png"
                  downloadLabel="Download PNG"
                />
                <AssetCard
                  title="App Icon"
                  description="Zaza Draft app icon. High-resolution PNG, 1024x1024px."
                  previewImage="/zaza-logo.png"
                  downloadUrl="/press-kit/zaza-app-icon.png"
                  downloadLabel="Download PNG"
                />
                <AssetCard
                  title="Monochrome Logo"
                  description="Single-color version for print and special use cases. SVG format."
                  previewImage="/press-kit/logo-mono-preview.jpg"
                  downloadUrl="/press-kit/zaza-draft-logo-mono.svg"
                  downloadLabel="Download SVG"
                />
              </div>
            </section>

            {/* Product Screenshots */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Product Screenshots</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <AssetCard
                  title="Hero Screenshot"
                  description="Main product hero image showing the Zaza Draft interface."
                  previewImage="/press-kit/screenshot-hero-preview.jpg"
                  downloadUrl="/press-kit/screenshot-hero.png"
                  downloadLabel="Download PNG"
                />
                <AssetCard
                  title="Dashboard View"
                  description="Teacher dashboard with recent comments and quick actions."
                  previewImage="/press-kit/screenshot-dashboard-preview.jpg"
                  downloadUrl="/press-kit/screenshot-dashboard.png"
                  downloadLabel="Download PNG"
                />
                <AssetCard
                  title="Draft Editor"
                  description="Comment drafting interface with AI suggestions and tone controls."
                  previewImage="/press-kit/screenshot-editor-preview.jpg"
                  downloadUrl="/press-kit/screenshot-editor.png"
                  downloadLabel="Download PNG"
                />
                <AssetCard
                  title="Safety Guardrails"
                  description="Hallucination prevention and translation safety features in action."
                  previewImage="/press-kit/screenshot-safety-preview.jpg"
                  downloadUrl="/press-kit/screenshot-safety.png"
                  downloadLabel="Download PNG"
                />
              </div>
            </section>

            {/* Brand Guidelines */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Brand Guidelines</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AssetCard
                  title="Brand Guidelines PDF"
                  description="Download our brand guidelines for logo use, colours, and typography."
                  downloadUrl="/press-kit/zaza-brand-guidelines.pdf"
                  downloadLabel="Download PDF"
                />
              </div>
            </section>

            {/* Company Boilerplate */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Company Boilerplate</h2>
              <div className="bg-[#1F2937] rounded-2xl p-8 border border-[#374151]">
                <p className="text-[#D1D5DB] leading-relaxed mb-4">
                  Zaza Technologies builds safe, empathetic AI tools for educators. Our flagship app, Zaza Draft, helps
                  teachers save hours each week on parent communications with hallucination-safe AI. Headquartered in
                  Germany, Zaza is teacher-first, GDPR-compliant, and trusted by schools worldwide.
                </p>
                <p className="text-[#9CA3AF] text-sm">
                  For media inquiries or interviews, contact{" "}
                  <a href="mailto:press@zazatechnologies.com" className="text-[#A78BFA] hover:underline">
                    press@zazatechnologies.com
                  </a>
                </p>
              </div>
            </section>

            {/* Founder Bio */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Founder Bio</h2>
              <ExpandableBio
                shortLabel="Short Bio"
                longLabel="Long Bio"
                shortBio="Greg Blackburn is the founder of Zaza Technologies. With a PhD in Professional Education and 20+ years in Learning & Development, Greg has worked at the intersection of education, AI, and technology. He founded Zaza to help teachers thrive by saving time, reducing stress, and focusing on what matters most: teaching."
                longBio="Dr. Harvey Gregory Scott Blackburn (Greg) is the founder of Zaza Technologies, an AI-powered EdTech company based in Germany. Greg began his career in Learning & Development after completing a Diploma in German and an MBA from the University of Queensland, later earning a PhD in Professional Education from City, University of London. His research focused on critical thinking and problem-solving in student-centred eLearning. Over two decades, he has led major learning initiatives in both higher education and corporate environments, most recently as Group Director of Learning at Communardo. Zaza Technologies reflects Greg's vision of building safe, teacher-first AI tools that combine sound pedagogy with cutting-edge AI. Greg lives in Germany with his family and is passionate about empowering educators through technology."
              />
            </section>

            {/* Media Contact */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-[#F9FAFB] mb-6">Media Contact</h2>
              <div className="bg-[#1F2937] rounded-2xl p-8 border border-[#374151]">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#A78BFA]" />
                    <div>
                      <p className="text-sm text-[#9CA3AF]">Email</p>
                      <a
                        href="mailto:press@zazatechnologies.com"
                        className="text-[#F9FAFB] hover:text-[#A78BFA] transition-colors"
                      >
                        press@zazatechnologies.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-5 h-5 text-[#A78BFA]" />
                    <div>
                      <p className="text-sm text-[#9CA3AF]">Website</p>
                      <a
                        href="https://zazatechnologies.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F9FAFB] hover:text-[#A78BFA] transition-colors"
                      >
                        zazatechnologies.com
                      </a>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-[#7C3AED] to-[#6366F1] hover:from-[#6D28D9] hover:to-[#4F46E5] text-white rounded-xl">
                  <Mail className="w-4 h-4 mr-2" />
                  Get in Touch
                </Button>
              </div>
            </section>

            {/* Footer CTA */}
            <div className="bg-gradient-to-r from-[#7C3AED]/10 to-[#6366F1]/10 rounded-2xl p-8 border border-[#7C3AED]/20 text-center">
              <p className="text-[#D1D5DB] mb-2">Need something else?</p>
              <a
                href="mailto:press@zazatechnologies.com"
                className="text-[#A78BFA] hover:text-[#C4B5FD] transition-colors font-medium"
              >
                Contact press@zazatechnologies.com
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
import type { Metadata } from "next"

