const { default: mongoose } = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  done: {
    type: String,
    enum: ["done", "canceld", "pending"],
    default: "pending",
  },
});

const taskModel = mongoose.model("Task", TaskSchema);

module.exports = {
  taskModel,
};
