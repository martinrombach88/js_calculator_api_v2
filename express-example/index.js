// Importing the express module
const express = require("express");

// Initialize the express application
const app = express();

// Use middleware to parse JSON request bodies
app.use(express.json());

// POST route: /ping
app.post("/ping", (req, res) => {
  // Check if the request body has the "note" key with value "ping"
  const { note } = req.body;

  if (note === "ping") {
    // Respond with a success message
    return res.json({ message: "pong" });
  } else {
    // Respond with an error if note is not "ping"
    return res.status(400).json({ error: "Invalid note" });
  }
});

// Set up the server to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
