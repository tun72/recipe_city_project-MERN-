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
      user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.logout = async (req, res, next) => {
  res.cookie("jwt", null, { maxAge: 1 });
  return res.json({ message: "user logged out" });
};

exports.me = async (req, res, next) => {
  return res.status(200).json({
    user: req.user,
  });
};
