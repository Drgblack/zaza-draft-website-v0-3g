import { Users, Star, Award, TrendingUp } from "lucide-react"

interface SocialProofBarProps {
  stats: Array<{
    icon: "users" | "star" | "award" | "trending"
    value: string
    label: string
  }>
}

const iconMap = {
  users: Users,
  star: Star,
  award: Award,
  trending: TrendingUp,
}

export function SocialProofBar({ stats }: SocialProofBarProps) {
  return (
    <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = iconMap[stat.icon]
          return (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Icon className="w-5 h-5 text-[#A78BFA] mr-2" />
                <div className="text-3xl font-bold text-white">{stat.value}</div>
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
