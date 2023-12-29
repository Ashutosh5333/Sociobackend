const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter  your name"],
    maxLength: [50, "name can't exced 50 characters"],
    minLength: [3, "name should have more than 3 character"],
  },
  email: {
    type: String,
    required: [true, "please enter email"],
    unique: true,
    validate: [validator.isEmail, "please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter password"],
    minLength: [6, "password should be greater than 6 characters"],
  },
  gender: {
    type: String,
  }
 
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };
