const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const storage = multer.diskStorage({
    destination: "public/uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

let posts = [];
let comments = [];

// Upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
    const content = req.body.content;
    const file = req.file ? "/uploads/" + req.file.filename : null;

    posts.push({ content, file });
    res.json({ message: "Post uploaded!" });
});

// Get posts
app.get("/posts", (req, res) => {
    res.json(posts);
});

// Comment endpoint
app.post("/comment", (req, res) => {
    comments.push(req.body.comment);
    res.json({ message: "Comment added!" });
});

// Get comments
app.get("/comments", (req, res) => {
    res.json(comments);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
