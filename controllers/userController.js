const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
//@desc Register user
//@route POST /api/users/register
//@access public later will be private then authentication

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }

  //create hashed password
  const hashedPassword = await bcrypt.hash(password, 10);
  //console.log("hashed:", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`User ${user} created successfully`);
  if (user) {
    res
      .status(201)
      .json({ _id: user._id, username: user.username, email: user.email });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  res.json({ message: "User Registration" });
});

//@desc Login user
//@route POST /api/users/Login
//@access public later will be private then authentication

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "User Login" });
});

//@desc Current user info
//@route GET /api/users/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user" });
});

module.exports = { registerUser, loginUser, currentUser };
