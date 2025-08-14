import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(req, res) {
  // Allow requests from your frontend and Chrome extension
  const allowedOrigins = [
    "http://localhost:3000",
    "https://personal-dashboard-coral.vercel.app",
    "chrome-extension://bhchafbnmohhbkolblnkjddooelnjecm",
  ];

  const origin = req.headers.origin || "*";

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*"); // fallback for testing
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS"){
    res.status(200).end()
    return;
  }

  try {
    const response = await fetch(`${process.env.BASE_URL}/quotes`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.RAPID_API_HOST,
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
}
