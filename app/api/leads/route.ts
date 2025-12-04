import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const apiKey = process.env.BREVO_API_KEY
    const endpoint = process.env.BREVO_ENDPOINT || "https://api.brevo.com/v3/contacts"
    const listId = process.env.BREVO_LIST_ID_DEMO_LEADS

    if (!apiKey) {
      console.error("[v0] Missing BREVO_API_KEY for lead submission")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    const listIds = []
    if (listId && !Number.isNaN(Number(listId))) {
      listIds.push(Number(listId))
    }

    const brevoResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email: body.email,
        attributes: {
          FIRSTNAME: body.name,
          ROLE: body.role,
          ORG: body.org,
          COUNTRY: body.country,
          PRODUCT: body.product,
          TIME_PREFERENCE: body.timePreference,
          NOTES: body.notes,
          SOURCE_PATH: body.sourcePath,
        },
        ...(listIds.length ? { listIds } : {}),
      }),
    })

    if (!brevoResponse.ok) {
      console.error("[v0] Brevo API error:", await brevoResponse.text())
      return NextResponse.json({ error: "Failed to submit" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Lead submission error:", error)
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 })
  }
}

