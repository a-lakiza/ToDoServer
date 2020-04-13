const express = require("express");
const router = express.Router();
const todo_controller = require("../controllers/todo.controller");

router.get("/:userId", todo_controller.getTodos);
router.post("/create", todo_controller.createTodo);
router.put("/:id/update", todo_controller.updateTodo);
router.put("/updateMany", todo_controller.updateMany);
router.delete("/:id/delete", todo_controller.deleteTodo);
router.delete("/deleteCompleted", todo_controller.deleteCompletedTodos);

module.exports = router;
