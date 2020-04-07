const TodoModel = require("../models/todo.model");

exports.createTodo = async (req, res, next) => {
  try {
    const createdModel = await TodoModel.create(req.body);
    res.status(201).json(createdModel);
  } catch (err) {
    next(err);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const todoModel = await TodoModel.findById(req.params.id);
    if (todoModel) {
      res.status(200).json(todoModel);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    const allTodos = await TodoModel.find({});
    res.status(200).json(allTodos);
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        useFindAndModify: false
      }
    );
    if (updatedTodo) {
      res.status(200).json(updatedTodo);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};

exports.updateMany = async (req, res, next) => {
  const isCompleted = req.body.isCompleted;
  try {
    const updatedTodos = await TodoModel.updateMany(
      { isCompleted: !isCompleted },
      { $set: { isCompleted: isCompleted } }
    );
    if (updatedTodos) {
      res.status(200).json(updatedTodos);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(req.params.id);

    if (deletedTodo) {
      res.status(200).json(deletedTodo);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteCompletedTodos = async (req, res, next) => {
  try {
    const deletedTodos = await TodoModel.deleteMany({ isCompleted: true }
    );
    if (deletedTodos) {
      res.status(200).json(deletedTodos);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};