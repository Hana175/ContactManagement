const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
  //res.json({ message: "User Login" });
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const user = await User.findOne({ email });
  //compare password with hashed password)
  //user.password
  if (user && (await bcrypt.compare(password, user.password))) {
    //provide access token in the response.
    const accessToken = jwt.sign(
      {
        user: { username: user.username, email: user.email, id: user.id },
      },

      //access token secret, define a unique access token secret in the .env file
      process.env.ACCESS_TOKEN_SECRET,
      //expiration time for the token
      { expiresIn: "15m" }
    ); //sign in
    res.status(200).json({ accessToken });
  } else {
    res.status(401).json({ message: "Invalid email/password" });
    throw new Error("Password is not valid");
  }
});

//@desc Current user info
//@route GET /api/users/current
//@access private
//we need an access token to this.
const currentUser = asyncHandler(async (req, res) => {
  //res.json({ message: "Current user" });
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
