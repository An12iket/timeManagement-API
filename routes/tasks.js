const express = require("express");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/tasks");
const protect = require("../middleware/auth");

const router = express.Router();

// Protect all routes with JWT authentication
router.use(protect);

// Task routes
router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;