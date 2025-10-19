import { Shield, Lock, Award, CheckCircle } from "lucide-react"

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "FERPA Compliant",
      description: "Student data protected",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-level encryption",
    },
    {
      icon: Award,
      title: "Teacher Approved",
      description: "50,000+ educators",
    },
    {
      icon: CheckCircle,
      title: "No Credit Card",
      description: "Free to start",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {badges.map((badge, index) => {
        const Icon = badge.icon
        return (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon className="w-6 h-6 text-[#A78BFA]" />
            </div>
            <div className="font-semibold text-white text-sm mb-1">{badge.title}</div>
            <div className="text-xs text-gray-400">{badge.description}</div>
          </div>
        )
      })}
    </div>
  )
}
