const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "User already exists",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Signup Error:", error); // Log the error for debugging
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      success: false,
    });
  }
};

/* log in  */
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(403).json({
        status: "error",
        message: "Auth faild email password wrong",
        success: false,
      });
    }
    /* Check if the password is correct */
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(403).json({
        status: "error",
        message: "Auth faild email password wrong",
        success: false,
      });
    }

    /* jwt */
    const JwtToken = jwt.sign(
      { email: existingUser.email, _id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      status: "success",
      message: "Log in successfully",
      success: true,
      token: JwtToken,
      email: existingUser.email,
      name: existingUser.name,
    });
  } catch (error) {
    console.error("Signup Error:", error); // Log the error for debugging
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  signup,
  Login,
};
