const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User.js");
const { generateToken } = require("../helpers/tokens.js");
const { sendVerificationEmail } = require("../helpers/mailer.js");
const { validateEmail, validateUsername } = require("../helpers/validation.js");

exports.userRegistration = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      password,
      email,
      bYear,
      bMonth,
      bDay,
      gender
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email address"
      })
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        message: "This email address already exists"
      })
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    let tempUsername = first_name + last_name;
    const newUsername = await validateUsername(tempUsername);

    const newUser = await new User({
      first_name,
      last_name,
      username: newUsername,
      password: cryptedPassword,
      email,
      bYear,
      bMonth,
      bDay,
      gender
    }).save();
    const emailVerificationToken = generateToken(
      { id: newUser._id.toString() },
      "30m"
    )
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(newUser.email, newUser.first_name, url);

    const token = generateToken({ id: newUser._id.toString() }, '7d');
    res.send({
      id: newUser._id,
      username: newUser.username,
      picture: newUser.picture,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      token,
      verified: newUser.verified,
      message: "Register success! Please check email to activate your account"
    })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

exports.activateAccount = async (req, res) => {
  const { token } = req.body;
  const user = jwt.verify(token, process.env.TOKEN_SECRET);
  const isUserVerified = await User.findOne({ _id: user.id });
  if (isUserVerified.verified) {
    return res.status(400).json({ message: "This email is already verified" })
  } else {
    await User.findByIdAndUpdate(user.id, { verified: true });
    return res.status(200).json({ message: "Account has been activated successfully" })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email doesn't exist" })
    }
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(400).json({ message: "Incorrect password!!" });
    }
    const token = generateToken({ id: user._id.toString() }, '7d');
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token,
      verified: user.verified,
      message: "Login successfully!"
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}