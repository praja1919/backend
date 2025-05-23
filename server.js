// Top of server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require('dotenv').config(); // ✅ Load environment variables

const app = express();

// ===== Middlewares =====
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/uploads/portfolio', express.static(path.join(__dirname, 'uploads', 'portfolio')));

// ===== MongoDB Connection =====
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/Divyluck";
const PORT = process.env.PORT || 5000;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// ===== Routes =====
const userRoutes = require('./Routes/userRoutes');
const shopRoutes = require('./Routes/shopRoutes');
const tailorRoutes = require('./Routes/tailorRoutes');
const tempEmailRoutes = require('./Routes/tempEmailRoutes');
const imageRoutes = require('./Routes/imageRoutes');
const fabricRoutes = require('./Routes/fabricRoutes');
const registerRoutes = require('./Routes/registerRoutes'); // ✅ NEW

// ===== Mount Routes =====
app.use('/api/users', userRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/tailors', tailorRoutes);
app.use('/api/temp', tempEmailRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/fabrics', fabricRoutes);
app.use('/api/register', registerRoutes); // ✅ NEW

// ===== Default Route =====
app.get("/", (req, res) => {
  res.send("💃 Divyluck Fashion Portal Backend is Running 🎉");
});
