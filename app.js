const express = require("express");
const bodyParser = require("body-parser");
const todo = require("./routes/todo.route");
const user = require("./routes/user.route");
const cors = require('cors')
const UserModel = require('./models/user.model')
const passport = require('passport')
const mongoose = require("mongoose");
const app = express();
const dev_db_url = "mongodb://localhost:27017/ProjectDB";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
const db = mongoose.connection;
const port = 2000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/todos", todo);

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/user", user );
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = app;
