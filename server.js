const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contact", require("./routes/contact"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/projects", require("./routes/projects"));

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is running!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
