const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/process-audio", upload.single("audio"), async (req, res) => {
  const audioPath = req.file.path;

  // 🎤 STEP 1: Whisper
  exec(`python3 transcribe.py ${audioPath}`, async (err, stdout) => {
    if (err) return res.status(500).send("Whisper failed");

    const transcript = stdout.trim();

    // 🧠 STEP 2: Ollama
    const ollamaRes = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "phi3",
        prompt: `
You are a mental wellness assistant.

Analyze this journal entry and return JSON:
{
  "mood": "...",
  "intensity": 1-10,
  "likely_cause": "...",
  "next_steps": ["...", "..."]
}

Entry: ${transcript}
        `,
        stream: false
      })
    });

    const data = await ollamaRes.json();

    fs.unlinkSync(audioPath);

    res.json({
      transcript,
      analysis: data.response
    });
  });
});

app.listen(5000, () => console.log("Backend running on 5000"));