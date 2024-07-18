const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: [true, "An email must be unique"],
    },
    password: { type: String, required: true, select: false },
  },
  { timestamp: true }
);

UserSchema.statics.register = async function (name, email, password) {
  const exitUser = await this.findOne({ email });


  if (exitUser) {
    throw new Error("User is already exit!");
  }

  const salt = await bcrypt.genSalt();

  const hashValue = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hashValue });
  console.log(user);
  return user;
};

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({email}).select('+password')

  console.log(user);
 
  if (!user) {
    throw new Error("Please check your email and password");
  }
  console.log(user);

  const isCorrect = await bcrypt.compare(password, user.password);
  console.log(isCorrect);
  if (!isCorrect) {
    throw new Error("Please check your email and password");
  }
  return user;
};

module.exports = mongoose.model("user", UserSchema);
