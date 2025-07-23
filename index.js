const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const chat = require("./models/chat");
require("dotenv").config();
const Chat = require("./models/chat");
const { default: mongoose } = require("mongoose");
const methodOverride = require("method-override");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(methodOverride("_method"));
const post = [
  {
    postId: 101,
    username: "atul_singh",
    profilePic: "https://example.com/images/atul.jpg",
    content:
      "Aaj maine ReactJS me ek naya component banaya, kaafi mazedaar tha!",
    likes: 34,
    commentsCount: 5,
    timestamp: "2025-07-18T09:30:00Z",
  },
  {
    postId: 102,
    username: "dev_guru",
    profilePic: "https://example.com/images/dev.jpg",
    content:
      "Python me file handling kaafi easy hai jab aap try-except ka use karte ho.",
    likes: 56,
    commentsCount: 8,
    timestamp: "2025-07-17T14:10:00Z",
  },
  {
    postId: 103,
    username: "code_master",
    profilePic: "https://example.com/images/code.jpg",
    content:
      "Mujhe dark theme wale IDEs kaafi pasand hain. Tumhara favourite IDE kaunsa hai?",
    likes: 22,
    commentsCount: 3,
    timestamp: "2025-07-16T20:45:00Z",
  },
  {
    postId: 104,
    username: "tech_lover",
    profilePic: "https://example.com/images/tech.jpg",
    content: "Aaj ke din maine Git ke branches ko properly samjha. Finally!",
    likes: 41,
    commentsCount: 7,
    timestamp: "2025-07-15T12:00:00Z",
  },
  {
    postId: 105,
    username: "frontend_queen",
    profilePic: "https://example.com/images/frontend.jpg",
    content:
      "TailwindCSS ke saath responsive design banana kaafi smooth ho gaya hai.",
    likes: 63,
    commentsCount: 9,
    timestamp: "2025-07-14T18:25:00Z",
  },
];
async function main() {
  try {
   await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Error:", err);
  }
}

main();

// Home Page - Posts Feed
// app.get("/", (req, res) => {
//   res.render("index.ejs", { post });
// });

// Show All Chats
app.get("/", async (req, res) => {
  try {
    const allChats = await Chat.find();
    res.render("index.ejs", { allChats });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Render Form to Create New Chat
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// Create New Chat
app.post("/chats", async (req, res) => {
  try {
    const { from, to, msg } = req.body;
    await Chat.create({ from, to, msg });

    // Redirect to show updated chat list
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Render Edit Form for Specific Chat
app.get("/chats/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findById(id);
    if (!chat) return res.status(404).send("Chat not found");
    res.render("edit.ejs", { chat });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Update Chat Message
app.put("/chats/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { newMsg } = req.body;

    const updateChat = await Chat.findByIdAndUpdate(id, { msg: newMsg }, { new: true });
    console.log("Updated Chat:", updateChat);

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
//Delete Chats
app.delete("/chats/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("Deleting Chat with ID:", id);
    await Chat.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
