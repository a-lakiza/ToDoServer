const Todo = require("../models/todo.model");

exports.todo_create = function(req, res) {
  let todo = new Todo({
    text: req.body.text,
    isCompleted: req.body.isCompleted
  });
  todo.save(function(err, todo) {
    if (err) {
      return next(err);
    }
    res.send(todo);
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
    res.send(todo);
  });
};

exports.todo_updateMany = function(req, res) {
  const isCompleted = req.body.isCompleted;
  Todo.updateMany(
    { isCompleted: !isCompleted },
    { $set: { isCompleted: isCompleted } },
    function(err) {
      if (err) return next(err);
      res.send("Deleted successfully!");
    }
  );
};

exports.todo_delete = function(req, res) {
  Todo.findByIdAndRemove(req.params.id, function(err) {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
};

exports.todo_deleteMany = function(req, res) {
  const ids = req.params.ids.split(",");
  Todo.deleteMany({ _id: { $in: ids}}, function(err) {
    if (err) return next(err);
    res.send("Deleted successfully!");
  });
};
