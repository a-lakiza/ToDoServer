const express = require("express");
const router = express.Router();
const todo_controller = require("../controllers/todo.controller");

router.get("/:id", todo_controller.todo_details);
router.get("/", todo_controller.todo_all);
router.post("/create", todo_controller.todo_create);
router.put("/:id/update", todo_controller.todo_update);
router.put("/updateMany", todo_controller.todo_updateMany);
router.delete("/:id/delete", todo_controller.todo_delete);
router.delete("/deleteCompleted", todo_controller.todo_deleteCompleted);
module.exports = router;
