const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET ALL TASKS
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// ADD TASK
router.post("/", async (req, res) => {
  const newTask = new Task({
    title: req.body.title,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
    category: req.body.category,
    status: "Pending",
  });

  await newTask.save();

  res.json({
    message: "Task Added Successfully",
    task: newTask,
  });
});

// COMPLETE TASK
router.put("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status: "Completed" },
    { new: true }
  );

  res.json({
    message: "Task Completed",
    task,
  });
});

// EDIT TASK
router.patch("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    { new: true }
  );

  res.json({
    message: "Task Updated Successfully",
    task,
  });
});

// DELETE TASK
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  res.json({
    message: "Task Deleted Successfully",
  });
});

module.exports = router;