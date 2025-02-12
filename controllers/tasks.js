const Task = require("../models/Tasks");

// Create a task
const createTask = async (req, res) => {
  const { title, description, deadline, category } = req.body;

  try {
    console.log("Incoming Task Data:", req.body); // Log received data
    const task = await Task.create({
      title,
      description,
      deadline,
      category,
      createdBy: req.user?.id, // Ensure createdBy exists
    });
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error); // Log the exact error
    res.status(500).json({ error: error.message || "Failed to create task" });
  }
};


// Get all tasks
const getTasks = async (req, res) => {
    try {
      const tasks = await Task.find({ createdBy: req.user.id });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  };

// Update a task
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, deadline, status, category } = req.body;
  
    try {
      const task = await Task.findByIdAndUpdate(
        id,
        { title, description, deadline, status, category },
        { new: true }
      );
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: "Failed to update task" });
    }
  };

// Delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params;
  
    try {
      await Task.findByIdAndDelete(id);
      res.status(200).json({ message: "Task deleted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete task" });
    }
  };

module.exports = { createTask, getTasks, updateTask, deleteTask };