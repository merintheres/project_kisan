import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!message) {
      return NextResponse.json({ reply: "No message provided" }, { status: 400 });
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text:
                    "You are a helpful chatbot for farmers. Your job is to assist them with farming-related queries like crop care, weather updates, government schemes, soil health, etc. Keep your responses short and clear — no more than 2 to 3 short paragraphs.\n\n" +
                    `User: ${message}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini";

    return NextResponse.json({ reply }, { status: 200 });
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json({ reply: "Sorry, I couldn't respond at the moment." }, { status: 500 });
  }
}
