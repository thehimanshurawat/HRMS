import Todo from "../models/todo.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/customError.js";

export const setTodo = asyncHandler(async (req, res) => {
  const loggedInUserId = req.currUser._id;

  const { task, date } = req.body;

  const todo = new Todo({ loggedInUserId, task, date });

  const newTodo = await todo.save();

  if(!newTodo){
    throw new ApiError("Some error occured", 500);
  }

  res.status(201).json({ message: "Successfully created Todo task" });
});

export const getTodo = asyncHandler(async (req, res) => {
  const loggedInUserId = req.currUser._id;

  const today = new Date().toISOString().split("T")[0];

  const todos = await Todo.find({ loggedInUserId, date: today }).select("task");

  if (todos.length === 0) {
    return res.status(200).json({ message: "No tasks scheduled for today." });
  }

  const tasks = todos.map((todo) => todo.task);

  res.status(200).json({ tasks });
});
