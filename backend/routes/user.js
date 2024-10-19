const crypto = require("crypto");
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const sendEmail = require("../utils/email");
require("dotenv").config();

const router = express.Router();

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  if (!user.isVerified) {
    return res
      .status(403)
      .json({
        error:
          "Email not verified. Please verify your email before logging in.",
      });
  }

  if (await bcrypt.compare(password, user.password)) {
    res.json({ message: "Login successful!", user });
  } else {
    res.status(401).json({ error: "Invalid email or password." });
  }
});

// Search Users by Course
router.get("/search", async (req, res) => {
  const { course } = req.query;

  if (!course) {
    return res.status(400).json({ error: "Course query is required" });
  }

  try {
    const users = await User.find({
      courses: { $regex: new RegExp(course, "i") }, // 'i' for case-insensitive search
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/add-course", async (req, res) => {
  try {
    const { userId, course } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.courses.includes(course)) {
      user.courses.push(course);
      await user.save();
      return res
        .status(200)
        .json({ message: "Course added successfully", user });
    } else {
      return res.status(400).json({ message: "Course already exists" });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Server error", error });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password, yearOfStudy, branch } = req.body;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+)\.iitr\.ac\.in$/;

  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({
        message:
          "Invalid email domain. Please use an email address from a subdomain of iitr.ac.in",
      });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiration = Date.now() + 3600000;

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      yearOfStudy,
      branch,
      verificationToken,
      tokenExpiration,
    });
    await newUser.save();

    const verificationLink = `${process.env.VITE_API_URL}/api/users/verify-email?token=${verificationToken}&email=${email}`;
    const subject = "Verify Your Email Address";
    const text = `Hello ${name},

Thank you for registering on our platform! Please verify your email address to complete your registration.

Click the link below to verify your email:
${verificationLink}

If the link doesn't work, you can copy and paste it into your browser.

Please note that this link is valid for 1 hour.

If you did not register on our platform, please ignore this email.

Best regards,
Course Connect Team`;
    await sendEmail(email, subject, text);

    res
      .status(201)
      .json({
        message:
          "Registration successful! Please check your email for verification.",
      });
  } catch (error) {
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
});

router.post("/resend-verification", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.isVerified) {
      return res
        .status(404)
        .json({ message: "User not found or already verified." });
    }
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiration = Date.now() + 3600000;

    user.verificationToken = verificationToken;
    user.tokenExpiration = tokenExpiration;
    await user.save();

    const verificationLink = `${process.env.VITE_API_URL}/api/users/verify-email?token=${verificationToken}&email=${email}`;
    const subject = "Email Verification";
    const text = `Hello ${user.name},

Thank you for registering on our platform! Please verify your email address to complete your registration.

Click the link below to verify your email:
${verificationLink}

If the link doesn't work, you can copy and paste it into your browser.

Please note that this link is valid for 1 hour.

If you did not register on our platform, please ignore this email.

Best regards,
Course Connect Team`;
    await sendEmail(email, subject, text);

    res
      .status(200)
      .json({ message: "Verification email resent successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to resend verification email. Please try again.",
      });
  }
});
router.get("/verify-email", async (req, res) => {
  const { token, email } = req.query;

  try {
    const user = await User.findOne({ email });

    if (
      user &&
      user.verificationToken === token &&
      user.tokenExpiration > Date.now()
    ) {
      user.isVerified = true;
      user.verificationToken = undefined;
      user.tokenExpiration = undefined;
      await user.save();

      res.status(200).json({ message: "Email verified successfully!" });
    } else {
      res
        .status(400)
        .json({ message: "Invalid or expired verification token." });
    }
  } catch (error) {
    res.status(500).json({ message: "Verification failed. Please try again." });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000;
  await user.save();

  const resetLink = `${process.env.VITE_API_URL}/reset-password?token=${resetToken}&email=${email}`;
  const subject = "Reset Your Password";
  const text = `Hello ${user.name},

We received a request to reset your password for your account. You can reset your password by clicking the link below:
${resetLink}

If you didn't request a password reset, please ignore this email.

This link will expire in 1 hour for your security.

Best regards,
Course Connect Team`;
  await sendEmail(email, subject, text);

  res.status(200).json({ message: "Password reset link sent to your email." });
});

// Reset Password
router.post("/reset-password", async (req, res) => {
  const { token, email, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (
    !user ||
    user.resetPasswordToken !== token ||
    user.resetPasswordExpires < Date.now()
  ) {
    return res.status(400).json({ error: "Invalid or expired token." });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Password has been reset successfully." });
});

module.exports = router;
