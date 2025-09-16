"use client"; // required for client-side fetch

import axios from "axios";

export async function generateReactCode(prompt: string) {
  try {
    const response = await axios.post("/api/generate", { prompt });
    return response.data.code; // assume API returns { code: "...React code..." }
  } catch (err) {
    console.error(err);
    return "// Error generating code";
  }
}
