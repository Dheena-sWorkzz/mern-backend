const express = require('express');
const Dbconnect = require("./DbConnect/DbConnect");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const userRoutes = require("./Routing/User");
const PostRoutes = require("./Routing/PostItem");
const like = require("./Routing/Likes");
const reply = require("./Routing/Replys");
const path = require('path');
const cors = require("cors");
const fs = require('fs');

const app = express();

// Connect to the database
Dbconnect();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'https://mern-frontend-ii0q.onrender.com'], // Array of allowed origins
  credentials: true // Allow cookies to be sent
};

app.use(cors(corsOptions));

// Routes
app.use("/user", userRoutes);
app.use("/item", PostRoutes);
app.use("/like", like);
app.use("/reply", reply);

// Serve static files from the React frontend app
const buildPath = path.join(__dirname, "../Frontend/Electronic_fix/dist");

// Check if index.html exists
const indexHtmlPath = path.join(buildPath, "index.html");
if (!fs.existsSync(indexHtmlPath)) {
  console.error(`Error: ${indexHtmlPath} does not exist.`);
  process.exit(1); // Exit the server process if index.html is missing
}

app.use(express.static(buildPath));

// Handle any other routes and serve the index.html from the React app
app.get("/*", function(req, res) {
  res.sendFile(
    indexHtmlPath,
    function(err) {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
    }
  );
});

// Get the port from environment variables or default to 3000
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
