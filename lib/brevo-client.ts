export type BrevoPayload = {
  email: string
  name?: string
  attributes?: Record<string, unknown>
  listId?: number
  source?: string
}

export class BrevoClientError extends Error {
  status?: number
  constructor(message: string, status?: number) {
    super(message)
    this.name = "BrevoClientError"
    this.status = status
  }
}

export function describeBrevoError(error: unknown, fallback: string) {
  if (error instanceof BrevoClientError) {
    return `${fallback} (${error.status ?? "unknown"}: ${error.message})`
  }
  if (error instanceof Error) {
    return `${fallback} (${error.message})`
  }
  return fallback
}

export async function submitBrevoContact(payload: BrevoPayload) {
  const response = await fetch("/api/brevo/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    const status = typeof data.status === "number" ? data.status : response.status
    const message =
      typeof data.error === "string" && data.error.length
        ? data.error
        : `Brevo request failed`
    throw new BrevoClientError(message, status)
  }

  return response.json().catch(() => ({}))
}
