import { Task } from "../models/task.model.js";

/**
 * Create a new task
 * @route POST /api/tasks
 */
export const createTask = async (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: "Task title is required" });
  }

  const task = await Task.create({
    title,
    user: req.user._id,
  });

  res.status(201).json({
    message: "Task created successfully",
    task,
  });
};

/**
 * Toggle task completion (pending <-> completed)
 * @route PATCH /api/tasks/:id
 */
export const toggleTaskStatus = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOne({
    _id: id,
    user: req.user._id,
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.completed = !task.completed;
  await task.save();

  res.status(200).json({
    message: "Task status updated",
    task,
  });
};

/**
 * Delete a task (hard delete)
 * @route DELETE /api/tasks/:id
 */
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  const deletedTask = await Task.findOneAndDelete({
    _id: id,
    user: req.user._id,
  });

  if (!deletedTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({
    message: "Task deleted successfully",
  });
};

/**
 * Get all tasks for logged-in user
 * @route GET /api/tasks
 */
export const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.status(200).json({ tasks });
};

/**
 * Get pending tasks
 * @route GET /api/tasks/pending
 */
export const getPendingTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user._id,
    completed: false,
  }).sort({ createdAt: -1 });

  res.status(200).json({ tasks });
};

/**
 * Get completed tasks
 * @route GET /api/tasks/completed
 */
export const getCompletedTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user._id,
    completed: true,
  }).sort({ createdAt: -1 });

  res.status(200).json({ tasks });
};
