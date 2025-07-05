import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/tokengenrater.js";

// Register a new user
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    generateToken(res, newUser._id);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });

  if (!existingUser || existingUser.status !== "active") {
    return res.status(403).json({ message: "Account has been deactivated" });
  }

  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  generateToken(res, existingUser._id);
  return res.status(200).json({ message: "Login successful" });
};

// Logout user
export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
  });

  res.json({
    message: "Logged out successfully!",
    success: true,
  });
};

// Get all users
export const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const users = await User.find({ status: "active" }).skip(skip).limit(limit);

    const totalUsers = await User.countDocuments({ status: "active" });

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashedPassword;
      }
      const updatedUser = await user.save();
      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update user by ID
export const updateUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if new email already exists for another user
    if (req.body.email && req.body.email !== user.email) {
      const existingEmailUser = await User.findOne({ email: req.body.email });
      if (
        existingEmailUser &&
        existingEmailUser._id.toString() !== user._id.toString()
      ) {
        return res
          .status(400)
          .json({ message: "Email already in use by another user" });
      }
    }

    // Check if admin is being demoted
    const isDemotingAdmin =
      user.isAdmin &&
      req.body.hasOwnProperty("isAdmin") &&
      req.body.isAdmin === false;

    if (isDemotingAdmin) {
      const adminCount = await User.countDocuments({ isAdmin: true });
      if (adminCount <= 1) {
        return res.status(400).json({
          message: "Cannot demote the last remaining admin.",
        });
      }
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    if (req.body.hasOwnProperty("isAdmin")) {
      user.isAdmin = Boolean(req.body.isAdmin);
    }

    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user by ID
export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.isAdmin) {
        return res.status(400).json({ message: "Cannot delete admin user" });
      }
      user.status = "inactive";
      await user.save();
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete multiple users
export const deleteMultipleUsers = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No IDs provided for deletion." });
    }

    const result = await User.updateMany(
      { _id: { $in: ids }, isAdmin: false },
      { status: "inactive" }
    );

    return res.status(200).json({
      message: "Users deleted successfully!",
      result,
    });
  } catch (error) {
    return res.status(500).json({ message: "Bulk delete failed" });
  }
};
