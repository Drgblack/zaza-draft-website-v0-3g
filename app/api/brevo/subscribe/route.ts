import { NextResponse } from "next/server"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const truncate = (value: string, limit = 256) => {
  if (!value) return ""
  return value.length > limit ? `${value.slice(0, limit)}...` : value
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = typeof body.email === "string" ? body.email.trim() : ""
    const name = typeof body.name === "string" ? body.name.trim() : ""
    const attributes = typeof body.attributes === "object" && body.attributes !== null ? body.attributes : {}
    const configuredListId = process.env.BREVO_DRAFT_LIST_ID ?? process.env.BREVO_LIST_ID_DRAFT_SIGNUPS
    const listIdInput = body.listId ?? configuredListId

    console.info("[brevo] /api/brevo/subscribe hit", {
      hasListId: Boolean(listIdInput),
    })

    if (!emailRegex.test(email)) {
      console.warn("[brevo] Invalid email address", { emailPresent: Boolean(email) })
      return NextResponse.json({ error: "Invalid email address", status: 400 }, { status: 400 })
    }

    console.info("[brevo] Email validated for subscription", {
      listId: listIdInput ? `${listIdInput}` : "none",
    })

    const apiKey = process.env.BREVO_API_KEY
    if (!apiKey) {
      console.warn("[brevo] Missing BREVO_API_KEY")
      if (process.env.NODE_ENV !== "production") {
        return NextResponse.json({ success: true })
      }
      return NextResponse.json({ error: "BREVO_API_KEY missing", status: 500 }, { status: 500 })
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

    console.info("[brevo] Brevo subscribe response", {
      status: brevoResponse.status,
      listIds: listIds.length ? listIds.join(",") : "none",
    })

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text()
      const sanitized = truncate(errorText.trim())
      console.error("[brevo] Failed to add contact", {
        status: brevoResponse.status,
        body: sanitized || "(empty)",
      })
      const message = sanitized ? `Brevo ${brevoResponse.status} - ${sanitized}` : `Brevo ${brevoResponse.status}`
      return NextResponse.json({ error: message, status: brevoResponse.status }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[brevo] Unexpected error", error)
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}
