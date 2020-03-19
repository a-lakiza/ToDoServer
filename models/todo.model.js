const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let TodoSchema = new Schema({
  text: { type: String, required: true, max: 100 },
  isCompleted: { type: Boolean, required: true }
});
module.exports = mongoose.model("Todo", TodoSchema);
