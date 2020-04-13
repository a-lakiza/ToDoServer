const express = require("express");
const router = express.Router();
const todo_controller = require("../controllers/todo.controller");

router.get("/:userId", todo_controller.getTodos);
router.post("/", todo_controller.createTodo);
router.put("/:id", todo_controller.updateTodo);
router.put("/", todo_controller.updateMany);
router.delete("/:id/", todo_controller.deleteTodo);
router.delete("/", todo_controller.deleteCompletedTodos);

module.exports = router;
