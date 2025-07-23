const Task = require('../models/Task');

async function getTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.json(tasks); // תמיד מחזיר מערך
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(200).json([]); // במקרה של שגיאה – מחזיר מערך ריק
  }
}

async function addTask(req, res) {
  try {
    console.log("req.body:", req.body); // ← בדיקה חשובה!
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const newTask = new Task({ title });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ error: 'Failed to add task' });
  }
}

async function toggleTask(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.done = !task.done;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    console.error("Error toggling task:", err);
    res.status(500).json({ error: 'Failed to toggle task' });
  }
}

async function deleteTask(req, res) {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
}

module.exports = {
  getTasks,
  addTask,
  toggleTask,
  deleteTask,
};
