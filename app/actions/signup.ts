"use server"

export async function subscribeToNewsletter(name: string, email: string) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY
    const endpoint = process.env.NEXT_PUBLIC_BREVO_ENDPOINT

    if (!apiKey || !endpoint) {
      console.warn("[v0] Brevo credentials not configured, using mock endpoint")
      // Mock success for development
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { success: true }
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: name,
        },
        listIds: [1],
        updateEnabled: true,
        ext_id: "Draft-website",
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("[v0] Brevo API error:", errorData)
      return { success: false, error: "Failed to subscribe" }
    }

    return { success: true }
  } catch (err) {
    console.error("[v0] Signup error:", err)
    return { success: false, error: "An error occurred" }
  }
}
