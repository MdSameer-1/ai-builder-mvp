import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openaihelper";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: `Generate a React component for: ${prompt}` }],
      temperature: 0.5,
    });

    const code = completion.choices[0].message?.content || "";
    return NextResponse.json({ code });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate code" }, { status: 500 });
  }
}
