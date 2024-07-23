const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    //find existing email
    const lowerCaseEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: lowerCaseEmail });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exist with this email",
      });
    }
    ///hash password
    const hashedPass = bcrypt.hashSync(password, 8);
    const newUser = User({
      firstName,
      lastName,
      email: lowerCaseEmail,
      password: hashedPass,
    });

    await newUser.save();

    ///remove password from response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    return res.status(201).json({
      message: "Registration Succesfull",
      data: userResponse,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, errorMessage: "Error regestring user" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const lowerCaseEmail = email.toLowerCase();
    //find user
    const user = await User.findOne({ email: lowerCaseEmail });
    if (user) {
      // match password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(404).json({
          message: "Wrong password",
        });
      }
      // sign the user
      const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      return res.status(200).json({
        message: "Login Succesfull",
        token,
        email: user.email,
      });
    } else {
      return res.status(400).json({
        message: "User does not exists",
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, errorMessage: "Error Logging user" });
  }
};
