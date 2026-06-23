const express = require("express");

const router = express.Router();

let tasks = [
  {
    id: 1,
    title: "Learn MERN",
    status: "Pending",
  },
];

// GET ALL TASKS
router.get("/", (req, res) => {
  res.json(tasks);
});

// ADD TASK
router.post("/", (req, res) => {
  const newTask = {
  id: tasks.length + 1,
  title: req.body.title,
  priority: req.body.priority || "Medium",
  dueDate: req.body.dueDate || "",
  category: req.body.category || "Study",
  status: "Pending",
};
  tasks.push(newTask);

  res.json({
    message: "Task Added Successfully",
    task: newTask,
  });
});

// COMPLETE TASK
router.put("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: "Task Not Found",
    });
  }

  task.status = "Completed";

  res.json({
    message: "Task Completed",
    task,
  });
});

// EDIT TASK
router.patch("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: "Task Not Found",
    });
  }

  task.title = req.body.title;

  res.json({
    message: "Task Updated Successfully",
    task,
  });
});

// DELETE TASK
router.delete("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  tasks = tasks.filter((task) => task.id !== taskId);

  res.json({
    message: "Task Deleted Successfully",
  });
});

module.exports = router;