// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose
  .connect(
    "mongodb+srv://anupamsingh1414:Rishi1313@instadata.wxmcy.mongodb.net/port",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Message schema
const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

// Routes
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res
      .status(201)
      .json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Contact Form API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
