import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; // make sure path is correct


import jwt from "jsonwebtoken";

const router = express.Router();

const JWT_SECRET = "your_jwt_secret_key"; // use from config

// LOGIN
router.post("/login", async (req, res) => {
  const { role, email, password } = req.body;

  try {
    const user = await User.findOne({ email, role });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { email: user.email, role: user.role } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



// REGISTER
router.post("/register", async (req, res) => {
  const { role, email, password, fullName, age, gender, sport, state } = req.body;

  try {
    console.log("Register request body:", req.body); // <-- add this log

    if (!email || !password || !role || !fullName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      role,
      email,
      password: hashedPassword,
      fullName,
      age,
      gender,
      sport,
      state,
    });

    const savedUser = await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (err) {
    console.error("Register error:", err); // <-- this will show exact reason in terminal
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
