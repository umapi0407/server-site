// const express = require("express");
// const router = express.Router();
// const fetch = (...args) =>
//   import("node-fetch").then(({ default: fetch }) => fetch(...args));

// router.post("/", async (req, res) => {
//   try {
//     const { messages } = req.body;
//     const API_KEY = process.env.GEMINI_API_KEY;

//     if (!API_KEY) {
//       return res.status(500).json({ error: "GEMINI_API_KEY not configured" });
//     }

//     if (!Array.isArray(messages) || messages.length === 0) {
//       return res.status(400).json({ error: "Messages are required" });
//     }

//     // Limit conversation memory
//     const recentMessages = messages.slice(-8);

//     const conversation = recentMessages
//       .map((m) => `${m.role}: ${m.content}`)
//       .join("\n");

//     const systemPrompt = `
// You are an AI assistant for Kryyvix, a professional web development agency.

// You can answer:
// - Company policies & privacy
// - Services & workflow
// - Timeline & tech stack
// - Team & support

// Rules:
// - Be concise and professional
// - Do NOT guess pricing
// - Redirect custom pricing to contact form
// - Contact email: hello@kryyvix.com
// `;

//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [
//             {
//               role: "user",
//               parts: [
//                 {
//                   text: `${systemPrompt}\n\nConversation:\n${conversation}`,
//                 },
//               ],
//             },
//           ],
//         }),
//       }
//     );

//     if (!response.ok) {
//       const err = await response.text();
//       console.error("Gemini API Error:", err);
//       return res.status(500).json({ error: "AI service failed" });
//     }

//     const data = await response.json();

//     const assistantMessage =
//       data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//       "Sorry, I couldn't generate a response.";

//     res.json({ message: assistantMessage });
//   } catch (error) {
//     console.error("Chat Error:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;
const express = require("express");
// const fetch = require("node-fetch"); // 🔥 REQUIRED
const router = express.Router();

router.post("/", async (req, res) => {

    console.log("FETCH TYPE:", typeof fetch);

  try {
    const { messages } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY missing" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: messages.map(m => m.content).join("\n")
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", JSON.stringify(data, null, 2));
      return res.status(500).json({ error: data });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini";

    res.json({ message: reply });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
