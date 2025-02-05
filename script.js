const validUsers = {
    "Skibidi Gyattler": "joelisfat",
    "#1 Gooner": "ILoveKidsLmao123"
};

// Check if already logged in
if (localStorage.getItem("loggedInUser")) {
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("upload-container").classList.remove("hidden");
}

// Login function
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (validUsers[username] && validUsers[username] === password) {
        localStorage.setItem("loggedInUser", username);
        document.getElementById("login-container").classList.add("hidden");
        document.getElementById("upload-container").classList.remove("hidden");
    } else {
        alert("Invalid credentials!");
    }
}

// Upload post function
function uploadPost() {
    const content = document.getElementById("post-content").value;
    const file = document.getElementById("file-upload").files[0];

    if (!content && !file) {
        alert("Post cannot be empty!");
        return;
    }

    const formData = new FormData();
    formData.append("content", content);
    if (file) formData.append("file", file);

    fetch("https://bhsnews-production.up.railway.app/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadPosts();
    })
    .catch(error => console.error('Error uploading post:', error));
}

// Load posts
function loadPosts() {
    fetch("https://bhsnews-production.up.railway.app/posts")
        .then(response => response.json())
        .then(posts => {
            const container = document.getElementById("posts-container");
            container.innerHTML = "";
            posts.forEach(post => {
                const postElement = document.createElement("div");
                postElement.classList.add("post");

                postElement.innerHTML = `
                    <p>${post.content}</p>
                    ${post.file ? `<img src="${post.file}" style="max-width:300px;">` : ""}
                `;
                container.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error loading posts:', error));
}

// Post a comment
function postComment() {
    const comment = document.getElementById("comment-input").value;
    fetch("https://bhsnews-production.up.railway.app/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment })
    })
    .then(() => loadComments())
    .catch(error => console.error('Error posting comment:', error));
}

// Load comments
function loadComments() {
    fetch("https://bhsnews-production.up.railway.app/comments")
        .then(response => response.json())
        .then(comments => {
            const container = document.getElementById("comments-container");
            container.innerHTML = "";
            comments.forEach(comment => {
                const commentElement = document.createElement("p");
                commentElement.textContent = comment;
                container.appendChild(commentElement);
            });
        })
        .catch(error => console.error('Error loading comments:', error));
}

loadPosts();
loadComments();
