import { NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const image = formData.get("image") as File | null
    if (!image) {
      return NextResponse.json({ error: "No image uploaded." }, { status: 400 })
    }

    // Read image as base64
    const arrayBuffer = await image.arrayBuffer()
    const base64Image = Buffer.from(arrayBuffer).toString("base64")

    // Prepare Gemini multimodal API request
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key not set." }, { status: 500 })
    }

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are an expert agronomist. Identify the crop in the image. Reply with:\n- Crop name\n- Crop type (vegetable/cereal/fruit/other)\n- Growth stage (if visible)\n- 2-3 concise care tips.\nReply in JSON: {\"cropName\":...,\"cropType\":...,\"growthStage\":...,\"careTips\":...}`
                },
                {
                  inline_data: {
                    mime_type: image.type,
                    data: base64Image
                  }
                }
              ]
            }
          ]
        })
      }
    )
    const data = await geminiRes.json()
    // Debug log
    console.log("Gemini multimodal response:", JSON.stringify(data, null, 2))

    let result = null
    if (data?.candidates?.length > 0 && data.candidates[0]?.content?.parts?.length > 0) {
      // Try to parse JSON from Gemini's reply
      let text = data.candidates[0].content.parts[0].text
      // Remove Markdown code block if present
      text = text.trim()
      if (text.startsWith('```')) {
        // Remove triple backticks and optional language label
        text = text.replace(/^```[a-zA-Z]*\n/, '').replace(/```$/, '').trim()
      }
      try {
        result = JSON.parse(text)
      } catch {
        return NextResponse.json({ error: "Could not parse Gemini response. Try a clearer image.\nRaw: " + text }, { status: 200 })
      }
    } else if (data?.error) {
      return NextResponse.json({ error: `Gemini API error: ${data.error.message}` }, { status: 200 })
    } else {
      return NextResponse.json({ error: "No response from Gemini. Try again." }, { status: 200 })
    }
    return NextResponse.json(result, { status: 200 })
  } catch (err) {
    console.error("Crop ID API error:", err)
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 })
  }
}
