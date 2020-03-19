const Todo = require("../models/todo.model");
exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};
exports.todo_create = function(req, res) {
  let todo = new Todo({
    text: req.body.text,
    isCompleted: req.body.isCompleted
  });
  todo.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send("Todo Created successfully");
  });
};
exports.todo_details = function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (err) return next(err);
    res.send(todo);
  });
};
exports.todo_all = function(req, res) {
  Todo.find({}, function(err, todos) {
    if (err) return next(err);
    res.send(todos);
  });
};
exports.todo_update = function(req, res) {
  Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
    err,
    todo
  ) {
    if (err) return next(err);
    res.send("Todo udpated.");
  });
};
exports.todo_delete = function(req, res) {
  Todo.findByIdAndRemove(req.params.id, function(err) {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
};
