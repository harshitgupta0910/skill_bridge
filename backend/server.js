require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ MongoDB Connection (from .env)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// ✅ Models
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    bio: String,
    location: String,
    availability: String,
    languages: [String],
    photo: String,
    skills: [String],
    wantToLearn: [String],
  })
);

const Message = mongoose.model(
  "Message",
  new mongoose.Schema({
    senderId: String,
    receiverId: String,
    text: String,
    timestamp: { type: Date, default: Date.now },
    status: { type: String, default: "sent" },
  })
);

// ✅ Multer for uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// ✅ JWT Auth Middleware (from .env)
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
};

// ✅ Routes
// Auth
app.post("/api/auth/register", upload.single("avatar"), async (req, res) => {
  try {
    const { name, email, password, bio, location, availability, languages } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      bio,
      location,
      availability,
      languages: languages ? languages.split(",") : [],
      photo: req.file ? `/uploads/${req.file.filename}` : "",
      skills: JSON.parse(req.body.skills || "[]"),
      wantToLearn: JSON.parse(req.body.wantToLearn || "[]"),
    });
    await user.save();
    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Users
app.get("/api/user/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

app.get("/api/community/members", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/api/user/profile", verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { ...req.body },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/user/avatar", verifyToken, upload.single("avatar"), async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { photo: `/uploads/${req.file.filename}` },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Messages
app.post("/api/messages", verifyToken, async (req, res) => {
  try {
    const { receiverId, text, timestamp } = req.body;
    const newMsg = new Message({
      senderId: req.userId,
      receiverId,
      text,
      timestamp,
      status: "sent",
    });
    await newMsg.save();
    res.json(newMsg);

    const payload = { senderId: req.userId, receiverId, text, timestamp, status: "sent" };
    [receiverId, req.userId].forEach((id) => {
      const socketId = userSockets[id];
      if (socketId) io.to(socketId).emit("receive_message", payload);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/messages/:otherUserId", verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.userId, receiverId: req.params.otherUserId },
        { senderId: req.params.otherUserId, receiverId: req.userId },
      ],
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/messages/read", verifyToken, async (req, res) => {
  try {
    const { messageIds, receiverId } = req.body;
    await Message.updateMany(
      { _id: { $in: messageIds }, receiverId: req.userId },
      { $set: { status: "read" } }
    );

    const socketId = userSockets[receiverId];
    if (socketId) {
      io.to(socketId).emit("message_read", { messageIds });
    }

    res.json({ message: "Messages marked as read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Socket.IO
const userSockets = {};
io.on("connection", (socket) => {
  console.log("🟢 Connected:", socket.id);

  socket.on("register", (userId) => {
    userSockets[userId] = socket.id;
    console.log(`User ${userId} registered`);
    Object.entries(userSockets).forEach(([uid, sid]) => {
      io.to(sid).emit("online_status", { userId, status: true });
    });
  });

  socket.on("check_online", (targetUserId) => {
    const status = !!userSockets[targetUserId];
    socket.emit("online_status", { userId: targetUserId, status });
  });

  socket.on("message_read", ({ messageIds, receiverId }) => {
    const socketId = userSockets[receiverId];
    if (socketId) {
      io.to(socketId).emit("message_read", { messageIds });
    }
  });

  socket.on("disconnect", () => {
    const userId = Object.keys(userSockets).find((id) => userSockets[id] === socket.id);
    if (userId) {
      delete userSockets[userId];
      console.log(`User ${userId} disconnected`);
      Object.entries(userSockets).forEach(([uid, sid]) => {
        io.to(sid).emit("online_status", { userId, status: false });
      });
    }
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
