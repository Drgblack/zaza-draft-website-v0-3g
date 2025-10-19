export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window === "undefined") return

  // Track with GA4
  if ((window as any).gtag) {
    ;(window as any).gtag("event", eventName, properties)
  }

  // Track with Segment/custom analytics if available
  if ((window as any).analytics) {
    ;(window as any).analytics.track(eventName, properties)
  }

  console.log("[v0] Analytics event:", eventName, properties)
}

// Tier 3 specific tracking events
export const analytics = {
  // AI Literacy tracking
  aiLiteracy: {
    viewHub: () => trackEvent("ai_literacy_hub_viewed"),
    viewCourse: (courseId: string, courseTitle: string) =>
      trackEvent("course_viewed", { course_id: courseId, course_title: courseTitle }),
    startCourse: (courseId: string, courseTitle: string) =>
      trackEvent("course_started", { course_id: courseId, course_title: courseTitle }),
    downloadResource: (resourceId: string, resourceTitle: string) =>
      trackEvent("resource_downloaded", { resource_id: resourceId, resource_title: resourceTitle }),
    viewCertification: () => trackEvent("certification_page_viewed"),
  },

  // Integration Marketplace tracking
  integrations: {
    viewHub: () => trackEvent("integrations_hub_viewed"),
    viewIntegration: (integrationName: string, category: string) =>
      trackEvent("integration_viewed", { integration_name: integrationName, category }),
    searchIntegrations: (query: string) => trackEvent("integrations_searched", { search_query: query }),
    filterByCategory: (category: string) => trackEvent("integrations_filtered", { category }),
  },

  // Webinar tracking
  webinars: {
    viewHub: () => trackEvent("webinars_hub_viewed"),
    registerWebinar: (webinarId: string, webinarTitle: string) =>
      trackEvent("webinar_registered", { webinar_id: webinarId, webinar_title: webinarTitle }),
    watchRecording: (webinarId: string, webinarTitle: string) =>
      trackEvent("webinar_recording_watched", { webinar_id: webinarId, webinar_title: webinarTitle }),
    filterByCategory: (category: string) => trackEvent("webinars_filtered", { category }),
  },

  // Community tracking
  community: {
    viewHub: () => trackEvent("community_hub_viewed"),
    viewCategory: (categoryName: string) => trackEvent("community_category_viewed", { category_name: categoryName }),
    viewDiscussion: (discussionId: string, discussionTitle: string) =>
      trackEvent("discussion_viewed", { discussion_id: discussionId, discussion_title: discussionTitle }),
    createPost: (categoryName: string) => trackEvent("community_post_created", { category_name: categoryName }),
  },

  // Ambassador tracking
  ambassadors: {
    viewPage: () => trackEvent("ambassador_page_viewed"),
    submitApplication: (formData: Record<string, any>) => trackEvent("ambassador_application_submitted", formData),
    expandFAQ: (question: string) => trackEvent("ambassador_faq_expanded", { question }),
  },

  // State of AI Report tracking
  report: {
    viewPage: () => trackEvent("report_page_viewed"),
    downloadReport: (email: string) => trackEvent("report_downloaded", { email }),
    shareReport: (platform: string) => trackEvent("report_shared", { platform }),
    viewPreviousReport: (year: string) => trackEvent("previous_report_viewed", { year }),
  },

  // Glossary tracking
  glossary: {
    viewHub: () => trackEvent("glossary_hub_viewed"),
    searchTerm: (query: string) => trackEvent("glossary_searched", { search_query: query }),
    viewTerm: (termId: string, termTitle: string) =>
      trackEvent("glossary_term_viewed", { term_id: termId, term_title: termTitle }),
    filterByCategory: (category: string) => trackEvent("glossary_filtered", { category }),
  },

  // Conversion tracking
  conversion: {
    clickCTA: (ctaLocation: string, ctaText: string, destinationUrl: string) =>
      trackEvent("cta_clicked", {
        cta_location: ctaLocation,
        cta_text: ctaText,
        destination_url: destinationUrl,
      }),
    startTrial: (source: string) => trackEvent("trial_started", { source }),
    viewPricing: (source: string) => trackEvent("pricing_viewed", { source }),
  },
}
