// Import necessary modules
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

// Create an Express app
const app = express();

// Use CORS for cross-origin requests
app.use(cors());

// Serve static files (optional for images)
app.use(express.static(path.join(__dirname, 'uploads')));

// Middleware for parsing JSON bodies
app.use(express.json());

// Configure Multer (file upload)
const upload = multer({ dest: 'uploads/' });

// Example in-memory posts and comments (you can replace this with a database later)
let posts = [];
let comments = [];

// Route to get all posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

// Route to upload a post (with optional image file)
app.post('/upload', upload.single('file'), (req, res) => {
    const content = req.body.content || '';
    const file = req.file ? `/uploads/${req.file.filename}` : null;

    // Save the new post
    const newPost = { content, file };
    posts.push(newPost);

    res.json({ message: 'Post uploaded successfully!', newPost });
});

// Route to post a comment
app.post('/comment', (req, res) => {
    const { comment } = req.body;
    if (comment) {
        comments.push(comment);
        res.json({ message: 'Comment posted successfully!' });
    } else {
        res.status(400).json({ error: 'Comment cannot be empty!' });
    }
});

// Route to get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Serve static files (for image upload)
app.use('/uploads', express.static('uploads'));

// Get the port from the environment or default to 3000
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
