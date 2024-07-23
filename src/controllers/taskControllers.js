const Task = require("../models/tasks");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).json({
      message: "Succesfull",
      tasks,
    });
  } catch (err) {
    console.log("Error fetching tasks:", err);
    return res.status(500).json({ error: "Error fetching tasks" });
  }
};

exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const newTask = await Task({
      title,
      description,
      status,
      createdBy: req.user.id,
    });

    newTask.save();

    return res.status(200).json({
      message: "Task created succesfully",
      newTask,
    });
  } catch (err) {
    console.log("Error creating tasks:", err);
    return res.status(500).json({ error: "Error creating tasks" });
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }

    if (task.createdBy.toString() != req.user.id) {
      return res.status(403).json({
        message: "User forbidden",
      });
    }
    task = await Task.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title,
          description,
          status,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (err) {
    console.log("Error creating tasks:", err);
    return res
      .status(500)
      .json({ error: err, errorMessage: "Error Updating tasks" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    console.log("--------------", req.params.id);
    const task = await Task.findById(req.params.id);
    console.log(task);
    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }

    if (task.createdBy.toString() != req.user.id) {
      return res.status(403).json({
        message: "User forbidden",
      });
    }

    await Task.deleteOne({ _id: req.params.id });

    return res.status(200).json({
      message: "Task deleted succesfully",
      task,
    });
  } catch (err) {
    console.log("Error deleting tasks:", err);
    return res.status(500).json({ error: "Error deleting tasks" });
  }
};
