import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!message) {
      return NextResponse.json({ reply: "No message provided" }, { status: 400 });
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
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
    console.log("Gemini raw response:", JSON.stringify(data, null, 2));
    let reply = "Gemini could not generate a response. Please rephrase your question.";
    if (data?.candidates?.length > 0 && data.candidates[0]?.content?.parts?.length > 0) {
      reply = data.candidates[0].content.parts[0].text;
    } else if (data?.error) {
      reply = `Gemini API error: ${data.error.message || JSON.stringify(data.error)}`;
    }
    return NextResponse.json({ reply }, { status: 200 });
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json({ reply: "Sorry, I couldn't respond at the moment." }, { status: 500 });
  }
}
