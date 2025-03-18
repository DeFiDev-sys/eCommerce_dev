import express from "express";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../middleware/sendEmailVerification.js";
import { sendPasswordResetEmail } from "../middleware/sendPasswordResetEmail.js";

const userRoutes = express.Router();

//Generating the token using the jsonwebtoken
//TODO:change the expire day after development
const genToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "20d" });
};

//login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    user.fistLogin = false;
    await user.save();
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      googleImage: user.googleImage,
      googleId: user.googleId,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
      active: user.active,
      fistLogin: user.fistLogin,
      created: user.createdAt,
    });
  } else {
    res.status(401).send("Invalid Email or Password");
    throw new Error("User not found");
  }
});

//register
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400).send("We already have an account with this email, please try another email");
    throw new Error("User already registered");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const newToken = genToken(user._id);

  sendVerificationEmail(newToken, name, email);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      googleImage: user.googleImage,
      googleId: user.googleId,
      fistLogin: user.fistLogin,
      isAdmin: user.isAdmin,
      token: newToken,
      active: user.active,
      created: user.createdAt,
    });
  } else {
    res.status(400).send("Registration failed");
    throw new Error("Something went wrong while registering, PLease check the info and try again");
  }
});

//verifyEmail
const verifyEmail = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (user) {
      user.active = true;
      await user.save();
      res.json("Thanks for activating your account. You can now close this window.");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(401).send("Email address could not be verified.");
  }
});

//passwordReset request
const passwordResetRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const newToken = genToken(user._id);
      sendPasswordResetEmail(newToken, user.name, user.email);
      res.status(200).send(`An reset email has been sent to ${email}`);
    }
  } catch (error) {
    res.status(401).send("There is no account with such email address");
  }
});

//password reset
const passwordReset = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (user) {
      user.password = req.body.password;
      await user.save();
      res.json("Password reset successful");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(401).send("Password reset failed");
  }
});

userRoutes.route("/login").post(loginUser);
userRoutes.route("/register").post(registerUser);
userRoutes.route("/verify-email").get(verifyEmail);
userRoutes.route("/password-reset-request").post(passwordResetRequest);
userRoutes.route("/password-reset").post(passwordReset);

export { userRoutes };
