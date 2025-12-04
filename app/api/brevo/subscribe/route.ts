import { NextResponse } from "next/server"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = typeof body.email === "string" ? body.email.trim() : ""
    const name = typeof body.name === "string" ? body.name.trim() : ""
    const attributes = typeof body.attributes === "object" && body.attributes !== null ? body.attributes : {}
    const listIdInput = body.listId ?? process.env.BREVO_LIST_ID_DRAFT_SIGNUPS

    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const apiKey = process.env.BREVO_API_KEY
    if (!apiKey) {
      console.warn("[brevo] Missing BREVO_API_KEY")
      if (process.env.NODE_ENV !== "production") {
        return NextResponse.json({ success: true })
      }
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    const listIds: number[] = []
    if (listIdInput) {
      const parsed = Number(listIdInput)
      if (!Number.isNaN(parsed)) {
        listIds.push(parsed)
      }
    }

    const payload = {
      email,
      attributes: {
        ...(name ? { FIRSTNAME: name } : {}),
        ...(body.source ? { SOURCE: body.source } : {}),
        ...attributes,
      },
      ...(listIds.length ? { listIds } : {}),
      updateEnabled: true,
    }

    const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(payload),
    })

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text()
      console.error("[brevo] Failed to add contact", errorText)
      return NextResponse.json({ error: "Failed to subscribe" }, { status: brevoResponse.status })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[brevo] Unexpected error", error)
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}
