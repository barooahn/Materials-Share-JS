// server/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  method: {
    type: String,
    enum: ["local", "google", "facebook"],
    required: true,
  },
  id: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
  },
  name: {
    type: String,
  },
  img: {
    type: String,
  },
  password: {
    type: String,
  },
});

UserSchema.methods.follow = function (user_id) {
  if (this.following.indexOf(user_id) === -1) {
    this.following.push(user_id);
  }
  return this.save();
};
UserSchema.methods.addFollower = function (fs) {
  this.followers.push(fs);
};

UserSchema.pre("save", async function (next) {
  try {
    console.log("Server/ Models/ user  pre save entered", this.password);
    if (this.method !== "local") {
      next();
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.password, salt);
    // Re-assign hashed version over original, plain text password
    this.password = passwordHash;
    console.log("Server/ Models/ user  pre save exited");
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model("User", UserSchema);
