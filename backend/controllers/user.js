const bcrypt = require("bcrypt");

const User = require("../models/User.js");
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
    res.json(newUser);
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}