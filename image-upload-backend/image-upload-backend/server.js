require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pool = require("./db");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/media", express.static("media"));

// Multer setup for storing images in the `media` folder
const storage = multer.diskStorage({
  destination: "./media/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Upload Image API
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { name, description } = req.body;
    const imageUrl = `/media/${req.file.filename}`;

    const result = await pool.query(
      "INSERT INTO images (name, description, image_url) VALUES ($1, $2, $3) RETURNING *",
      [name, description, imageUrl]
    );

    res.json({ success: true, image: result.rows[0] });
  } catch (error) {
    console.error("❌ Error uploading image:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Get All Images API
app.get("/images", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM images ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching images:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
