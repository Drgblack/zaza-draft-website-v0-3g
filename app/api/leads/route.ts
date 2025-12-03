import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Log the lead data
    console.log("[v0] Demo lead received:", body)

    // If Brevo credentials exist, forward to Brevo
    if (process.env.BREVO_API_KEY && process.env.BREVO_ENDPOINT) {
      try {
        const brevoResponse = await fetch(process.env.BREVO_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": process.env.BREVO_API_KEY,
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
            listIds: [2], // Adjust list ID as needed
          }),
        })

        if (!brevoResponse.ok) {
          console.error("[v0] Brevo API error:", await brevoResponse.text())
        }
      } catch (brevoError) {
        console.error("[v0] Failed to send to Brevo:", brevoError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Lead submission error:", error)
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 })
  }
}

