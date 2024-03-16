// Require necessary Node modules
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

// Create a new Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());

// This would be replaced by a database in a real-world application
const users = [];

// Secret key for JWT. In production, use a secure, environment-specific value
const JWT_SECRET = "your_jwt_secret";

// POST endpoint for user registration
app.post("/register", async (req, res) => {
  try {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(req.body.password, 8);

    // Create a new user and store in the "database"
    const user = { username: req.body.username, password: hashedPassword };
    users.push(user);

    // Respond with success message
    res.status(201).send({ message: "User created" });
  } catch (error) {
    console.log("Registration Failed", error);
    res.status(500).send("Error registering new user.");
  }
});

// POST endpoint for user login
app.post("/login", async (req, res) => {
  try {
    // Find the user by username
    const user = users.find((u) => u.username === req.body.username);
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    // Check the provided password against the stored hash
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    // User authenticated, create a JWT
    const token = jwt.sign({ username: user.username }, JWT_SECRET, {
      expiresIn: "2h",
    });

    // Respond with the JWT
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send("Error logging in.");
  }
});

// Middleware to authenticate and protect routes
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).send({ message: "Invalid token" });
  }
};

// GET endpoint for a protected route
app.get("/protected", authenticateJWT, (req, res) => {
  res
    .status(200)
    .send({ message: `Welcome, your username is ${req.user.username}` });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
