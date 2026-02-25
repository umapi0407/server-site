const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const contactRoutes = require("./routes/contact.routes.js");
const chatRoute = require("./routes/chat");

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:8080" || "https://kryyvix-website.vercel.app", // Vite frontend

}));

app.use(express.json());

app.use("/api/contact", contactRoutes);
app.use("/api/chat", chatRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
