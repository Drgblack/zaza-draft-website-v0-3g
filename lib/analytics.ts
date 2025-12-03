export function track(event: string, props?: Record<string, any>) {
  if (typeof window === "undefined") return
  const anyWindow = window as any
  if (anyWindow.analytics?.track) {
    anyWindow.analytics.track(event, props)
  }
}
