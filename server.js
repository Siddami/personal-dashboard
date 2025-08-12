import express from "express";
import fetch from "node-fetch"; 
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.static("public")); // Serve frontend

// Example endpoint: Fetch a random quote
app.get("/api/random-quote", async (req, res) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/quotes`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.RAPID_API_HOST,
      },
    });
    const data = await response.json();
    res.json(data); // Send data to frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});