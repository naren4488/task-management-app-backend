const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskControllers");

//get all tasks
router.get("/tasks", taskController.getAllTasks);

//create task
router.post("/task", taskController.createTask);

// edit task
router.put("/task/:id", taskController.updateTask);

//delete task
router.delete("/task/:id", taskController.deleteTask);

module.exports = router;
