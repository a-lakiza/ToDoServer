const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserModel = require('./user.model')

const TodoSchema = new Schema({
  text: { type: String, required: true, max: 100 },
  isCompleted: { type: Boolean, required: true },
  userId: { type: Schema.Types.ObjectId, ref: UserModel }
});

module.exports = mongoose.model("Todo", TodoSchema);
