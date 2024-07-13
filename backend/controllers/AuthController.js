const User = require("../models/UserModel");
const { createToken } = require("../utils/createToken");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.register(name, email, password);
    const token = await createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "success",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.login(email, password);

    const token = await createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "success",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
