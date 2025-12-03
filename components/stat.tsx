interface StatProps {
  label: string
  value: string
}

export function Stat({ label, value }: StatProps) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-[#7C3AED] mb-2">{value}</div>
      <div className="text-sm text-[#9CA3AF]">{label}</div>
    </div>
  )
}

