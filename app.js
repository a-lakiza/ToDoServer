const express = require("express");
const bodyParser = require("body-parser");
const todo = require("./routes/todo.route");
const app = express();
const mongoose = require("mongoose");
const dev_db_url = "mongodb://localhost:27017/ProjectDB";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
const db = mongoose.connection;
const port = 2000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/todos", todo);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});
