const { taskModel } = require("../models/task.model");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const taskspending = await taskModel.find({ done: "pending" });
    const taskdone = await taskModel.find({ done: "done" });

    res.render("index", { taskdone, taskspending });
  } catch (error) {
    next(error);
  }
});
router.post("/add", async (req, res, next) => {
  try {
    const { title } = req.body;
    await taskModel.create({ title, done: "pending" });
    // res.status(200).send({
    //   statusCode: res.status,
    //   message: "task add successfully",
    // });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.put("/update/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, done } = req.body;
    const task = await taskModel.findById(id);
    await task.updateOne({ title, done });

    res.json({ success: true, message: "تسک با موفقیت بروزرسانی شد" });
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await taskModel.deleteOne({ _id: id });
    res.json({ success: true, message: "تسک با موفقیت حذف شد" });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  TaskRouter: router,
};
