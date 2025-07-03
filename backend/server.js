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

// ✅ MongoDB Atlas Connection (SkillBridge DB)
mongoose.connect(
  "mongodb+srv://skillbridge:8sQcEMp1nSSvuCVk@cluster0.vrfgcya.mongodb.net/skillbridge?retryWrites=true&w=majority"
)
.then(() => console.log("✅ Connected to MongoDB Atlas"))
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
  })
);

const UserHistory = mongoose.model('UserHistory', new mongoose.Schema({
  userId: String,
  previousData: Object,
  changedAt: { type: Date, default: Date.now },
}));

// ✅ File Upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

//  JWT Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
};

// ✅ Helper
const safeJSONParse = (val) => {
  try {
    return JSON.parse(val);
  } catch {
    return [];
  }
};

// Routes

// Register
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
      languages: languages ? languages.split(",").map((lang) => lang.trim()) : [],
      photo: req.file ? `/uploads/${req.file.filename}` : "",
      skills: safeJSONParse(req.body.proficientSkills),
      wantToLearn: safeJSONParse(req.body.learningSkills),
    });
    await user.save();
    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1d" });

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        skills: user.skills,
        wantToLearn: user.wantToLearn,
        location: user.location,
        bio: user.bio,
        availability: user.availability,
        languages: user.languages,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Profile
app.get("/api/user/profile", verifyToken, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user);
});

// Get User By ID
app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

// Get All Users
app.get("/api/community/members", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Update Profile (with History Save)
app.put("/api/user/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user) {
      await UserHistory.create({ userId: user._id, previousData: user.toObject() });
      const updatedUser = await User.findByIdAndUpdate(
        req.userId,
        {
          name: req.body.name,
          bio: req.body.bio,
          location: req.body.location,
          availability: req.body.availability,
          languages: req.body.languages,
          skills: req.body.skills,
          wantToLearn: req.body.wantToLearn,
        },
        { new: true }
      );
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload Avatar
app.post("/api/user/avatar", verifyToken, upload.single("avatar"), async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.userId,
    { photo: `/uploads/${req.file.filename}` },
    { new: true }
  );
  res.json(updatedUser);
});

// Send Message
app.post("/api/messages", verifyToken, async (req, res) => {
  const { receiverId, text } = req.body;
  const newMsg = new Message({
    senderId: req.userId,
    receiverId,
    text,
  });
  await newMsg.save();
  res.json(newMsg);

  const receiverSocket = userSockets[receiverId];
  if (receiverSocket) {
    io.to(receiverSocket).emit("receive_message", {
      senderId: req.userId,
      text,
      timestamp: newMsg.timestamp,
    });
  }
});

// Fetch Conversation
app.get("/api/messages/:otherUserId", verifyToken, async (req, res) => {
  const otherUserId = req.params.otherUserId;
  const messages = await Message.find({
    $or: [
      { senderId: req.userId, receiverId: otherUserId },
      { senderId: otherUserId, receiverId: req.userId },
    ],
  }).sort({ timestamp: 1 });
  res.json(messages);
});

// ✅ Socket.IO Setup
const userSockets = {};

io.on("connection", (socket) => {
  console.log(" User connected:", socket.id);

  socket.on("register", (userId) => {
    userSockets[userId] = socket.id;

    console.log(`Registered socket for user ${userId} → ${socket.id}`);
  });

  socket.on("send_message", ({ senderId, receiverId, message }) => {
    const receiverSocket = userSockets[receiverId];
    if (receiverSocket) {
      io.to(receiverSocket).emit("receive_message", {
        senderId,
        text: message,
        timestamp: new Date(),
      });

      console.log(`📤 Real-time message from ${senderId} → ${receiverId}`);
    } else {
      console.log(` Receiver ${receiverId} not connected`);
    }
  });

  socket.on("disconnect", () => {
    const disconnectedUser = Object.keys(userSockets).find((id) => userSockets[id] === socket.id);
    if (disconnectedUser) delete userSockets[disconnectedUser];

    console.log(" User disconnected:", socket.id);
  });
});

// ✅ Start Server
server.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
