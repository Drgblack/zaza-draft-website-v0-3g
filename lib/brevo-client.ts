export type BrevoPayload = {
  email: string
  name?: string
  attributes?: Record<string, unknown>
  listId?: number
  source?: string
}

export async function submitBrevoContact(payload: BrevoPayload) {
  const response = await fetch("/api/brevo/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(typeof data.error === "string" ? data.error : "Subscription failed")
  }

  return response.json().catch(() => ({}))
}

