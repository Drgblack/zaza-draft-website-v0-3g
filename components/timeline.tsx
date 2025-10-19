import { Card } from "@/components/ui/card"

interface TimelineItem {
  date: string
  title: string
  body: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={index} className="flex gap-6">
          <div className="flex-shrink-0 w-20 text-right">
            <div className="text-lg font-bold text-[#7C3AED]">{item.date}</div>
          </div>
          <div className="flex-1 pb-6 border-l-2 border-[#1F2937] pl-6 relative">
            <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[#7C3AED]" />
            <Card className="bg-[#111827] border-[#1F2937] p-6">
              <h3 className="text-xl font-bold text-[#F9FAFB] mb-2">{item.title}</h3>
              <p className="text-[#9CA3AF]">{item.body}</p>
            </Card>
          </div>
        </div>
      ))}
    </div>
  )
}
