type PlausibleProps = Record<string, string | number | boolean>

type AnalyticsNamespace = {
  track: (event: string, props?: Record<string, any>) => void
  viewHub: () => void
  viewCategory: (category: string) => void
  viewDiscussion: (id: string | number, title?: string) => void
  viewTerm: (id: string | number, term?: string) => void
  registerWebinar: (id: string | number, title?: string) => void
  filterByCategory: (category: string) => void
  watchRecording: (id: string | number, title?: string) => void
}

const baseTrack = (event: string, props?: Record<string, any>) => {
  if (typeof window === "undefined") return
  try {
    window.plausible?.(event, props as PlausibleProps)
  } catch {
    // no-op
  }
  try {
    ;(window as any)?.analytics?.track?.(event, props)
  } catch {
    // no-op
  }
}

const makeNamespace = (): AnalyticsNamespace => ({
  track: baseTrack,
  viewHub: () => baseTrack("view_hub"),
  viewCategory: (category) => baseTrack("view_category", { category }),
  viewDiscussion: (id, title) => baseTrack("view_discussion", { id, title }),
  viewTerm: (id, term) => baseTrack("view_term", { id, term }),
  registerWebinar: (id, title) => baseTrack("register_webinar", { id, title }),
  filterByCategory: (category) => baseTrack("filter_by_category", { category }),
  watchRecording: (id, title) => baseTrack("watch_recording", { id, title }),
})

export const analytics: AnalyticsNamespace & {
  community: AnalyticsNamespace
  webinars: AnalyticsNamespace
  glossary: AnalyticsNamespace
} = {
  ...makeNamespace(),
  community: makeNamespace(),
  webinars: makeNamespace(),
  glossary: makeNamespace(),
}

export const track = (event: string, props?: Record<string, any>) => baseTrack(event, props)
export const trackEvent = (event: string, props?: Record<string, any>) => baseTrack(event, props)

declare global {
  interface Window {
    plausible?: (eventName: string, props?: PlausibleProps) => void
  }
}
