const express = require("express");
const mongoose = require("mongoose");
const bookController = require("./controller/book");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const model = require("./model/book");
const Book = model.book;

//
//
const book_5_read = require("./public/All_Server_Files/Books/RAME_5_books");
const bookread = require("./public/All_Server_Files/Books/RAME_books");
const bookClick = require("./public/All_Server_Files/Books/Book_click")

// Initialize the app
const app = express();
const PORT = 8080;
const uri = "mongodb+srv://root:root@cluster0.m87cn.mongodb.net/BookApi";

// Use relative path (relative to current script location)
const uploadDir = path.join(__dirname, "/public/uploads");

// Check if the directory exists, if not, create it
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// Middleware
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
async function mongoDbConnection() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
  }
}
mongoDbConnection();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Routes
app.post("/add", upload.array("files", 2), async (req, res) => {
  try {
    // Log form data and uploaded files
    console.log("Form data:", req.body);
    console.log("Uploaded files:", req.files);

    // Process the uploaded files
    const uploadedFiles = req.files.map((file) => ({
      originalName: file.originalname,
      filePath: file.path,
      fileSize: file.size,
    }));

    // Create book data object
    const bookData = {
      ...req.body, // Include form fields (e.g., name, isbn, genre, etc.)
      files: uploadedFiles, // Include uploaded files metadata
    };

    // Log the final book data
    console.log("Book data to be saved:", bookData);

    // Create new book and save it to MongoDB
    const book = new Book(bookData);
    await book.save();

    // Respond with success message and book data
    res.json({
      message: "Book and files uploaded successfully!",
      book: bookData,
      files: uploadedFiles,
    });
  } catch (error) {
    console.error("Error saving book:", error);
    res.status(500).json({ message: "Failed to upload book data." });
  }
});

// ROUTES FOR FRONTEND
//ROUTES FOR GETTING DATA
app.get("/books/:pages", bookread.readBooks);
app.get("/books", book_5_read.read5book);
app.get("/book/:id", bookClick.renderBookPage);

// ROUTES FOR POSTMAN
app.get("/bookss", bookController.read);
app.post("/book", bookController.create);
app.patch("/:id", bookController.update);
app.delete("/:id", bookController.delete);
app.get("/delete-all", bookController.deleteAll);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
