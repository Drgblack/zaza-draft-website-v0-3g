"use client";

import { useState, useEffect, useMemo } from "react"

type HeroStatsProps = {
  stats: {
    members: string
    discussions: string
    posts: string
    active: string
  }
}

type StatDefinition = {
  key: string
  label: string
  target: number
  suffix: string
}

const createStatDefinitions = (stats?: HeroStatsProps["stats"]): StatDefinition[] => {
  const safeStats = stats ?? {
    members: "Members",
    discussions: "Discussions",
    posts: "Posts",
    active: "Active",
  }
  return [
    { key: "members", label: safeStats.members, target: 25, suffix: "K+" },
    { key: "discussions", label: safeStats.discussions, target: 15, suffix: "K+" },
    { key: "posts", label: safeStats.posts, target: 98, suffix: "K+" },
    { key: "active", label: safeStats.active, target: 24, suffix: "/7" },
  ]
}

export default function HeroStats({ stats }: HeroStatsProps) {
  const statDefinitions = useMemo(() => createStatDefinitions(stats), [stats])
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    statDefinitions.reduce((acc, stat) => ({ ...acc, [stat.key]: 0 }), {})
  )

  useEffect(() => {
    let frame: number
    let startTime: number | null = null
    const duration = 1200

    const initialCounts = statDefinitions.reduce((acc, stat) => {
      acc[stat.key] = 0
      return acc
    }, {} as Record<string, number>)
    setCounts(initialCounts)

    const animate = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp
      }
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      const nextCounts = statDefinitions.reduce((acc, stat) => {
        acc[stat.key] = Math.round(stat.target * progress)
        return acc
      }, {} as Record<string, number>)

      setCounts(nextCounts)

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [statDefinitions])

  return (
    <div className="grid grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
      {statDefinitions.map((stat) => (
        <div key={stat.key} className="text-center">
          <div className="text-4xl font-bold text-white mb-2">
            {counts[stat.key] ?? 0}
            {stat.suffix}
          </div>
          <div className="text-gray-400 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
