"use client"

type WebinarDetailClientProps = {
  webinar: any
}

export default function WebinarDetailPlaceholder({ webinar }: WebinarDetailClientProps) {
  // Placeholder retains type compatibility without rendering details
  return null
}
