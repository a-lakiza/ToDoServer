const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  email: { type: String},
  googleID: { type: String },
  name: { type: String },
  password: { type: String }
});


module.exports = mongoose.model("Users", UserSchema);
