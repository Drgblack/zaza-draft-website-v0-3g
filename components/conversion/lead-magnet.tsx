"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, CheckCircle } from "lucide-react"

interface LeadMagnetProps {
  title: string
  description: string
  resourceName: string
  onSubmit?: (email: string) => void
}

export function LeadMagnet({ title, description, resourceName, onSubmit }: LeadMagnetProps) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(email)
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-[#8B5CF6]/10 to-[#A78BFA]/5 border border-[#8B5CF6]/30 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Check Your Email!</h3>
        <p className="text-gray-300">
          We've sent {resourceName} to {email}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-[#8B5CF6]/10 to-[#A78BFA]/5 border border-[#8B5CF6]/30 rounded-2xl p-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-[#8B5CF6] rounded-lg flex items-center justify-center flex-shrink-0">
          <Download className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 bg-[#1E293B] border-white/10 text-white placeholder:text-gray-400"
        />
        <Button type="submit" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white whitespace-nowrap">
          Download Free Resource
        </Button>
      </form>
      <p className="text-xs text-gray-400 mt-3">No spam. Unsubscribe anytime.</p>
    </div>
  )
}

