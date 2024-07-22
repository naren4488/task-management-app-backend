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
  console.log("req.user: ====", req.user);
  try {
    const newTask = await Task({
      title,
      description,
      status,
      createdBy: req.user.id,
    });

    newTask.save();

    return res.status(200).json({
      message: "Succesfull",
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
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }

    if (task.createdBy.toString() != req.user.id) {
      return res.status(404).json({
        message: "User not authorized",
      });
    }
    task = await Task.findAndUpdate(
      req.params.id,
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
      message: "Succesfull",
      task,
    });
  } catch (err) {
    console.log("Error creating tasks:", err);
    return res.status(500).json({ error: "Error Updating tasks" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }

    if (task.createdBy.toString() != req.params.id) {
      return res.status(404).json({
        message: "User not authorized",
      });
    }

    await Task.deleteOne(req.params.id);

    return res.status(200).json({
      message: "Task Deleted succesfully",
      task,
    });
  } catch (err) {
    console.log("Error deleting tasks:", err);
    return res.status(500).json({ error: "Error deleting tasks" });
  }
};
