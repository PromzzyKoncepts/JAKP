require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const streamRoutes = require("./routes/streamRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const setupSocket = require("./configs/socket");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [
      "https://jakp.vercel.app",
      "http://localhost:3000",
      "https://parenthub.lovetoons.org",
      "https://jakp.lovetoons.org",
      "https://live.jakp.lovetoons.org",
      "http://live.jakp.lovetoons.org",
      "https://lovetoons.org",
      "https://lovetoons.tv",
      "https://lovetoons.tv/jakp",
      "https://lovetoons.org/jakp",
      "*",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

const corsOptions = {
  origin: [
    "https://jakp.vercel.app",
    "http://localhost:3000",
    "https://parenthub.lovetoons.org",
    "https://jakp.lovetoons.org",
    "https://live.jakp.lovetoons.org",
    "http://live.jakp.lovetoons.org",
    "https://lovetoons.org",
    "https://lovetoons.tv",
    "https://lovetoons.tv/jakp",
    "https://lovetoons.org/jakp",
    "*",
  ],

  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/stream", streamRoutes);

// Socket.io setup
setupSocket(io);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
