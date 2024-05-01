import { Request, Response } from "express";
import userModel, { iProps } from "../model/userModel";
import { log } from "console";

export const createTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { title } = req.body;

    const createTask = await userModel.create({ title });

    return res.status(201).json({
      msg: "Created new todo successfully",
      data: createTask,
    });
  } catch (error) {
    log(error);
    return res.status(404).json({
      msg: "Error creating new todo",
    });
  }
};

export const createTodoProgress = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { taskID } = req.params;

    const { title } = req.body;

    const createTask = await userModel.findByIdAndUpdate(
      taskID,
      { progress: true },
      { new: true }
    );

    return res.status(201).json({
      msg: "Created new todo successfully",
      data: createTask,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "Error creating new todo",
    });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { taskID } = req.params;

    const { title } = req.body;

    const createTask = await userModel.findByIdAndDelete(taskID);

    return res.status(201).json({
      msg: "deleted new todo successfully",
      data: createTask,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "Error creating new todo",
    });
  }
};

export const createTodoDone = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { taskID } = req.params;

    const { title } = req.body;

    const findTask = await userModel.findById(taskID);

    if (findTask?.progress) {
      const createTask = await userModel.findByIdAndUpdate(
        taskID,
        { done: true },
        { new: true }
      );

      return res.status(201).json({
        msg: "Created new todo successfully",
        data: createTask,
      });
    } else {
      return res.status(404).json({
        msg: "You should have progressed before task being done",
      });
    }
  } catch (error) {
    return res.status(404).json({
      msg: "Error creating new todo",
    });
  }
};

export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const getTasks = await userModel.find();

    return res.status(201).json({
      msg: "Created new todo successfully",
      data: getTasks,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "Error creating new todo",
    });
  }
};

export const getAllCombine = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const getTasks = await userModel.find();

    const getAllTask = getTasks.filter((el: iProps) => {
      return el.progress === false && el.done === false;
    });

    const getAllProgress = getTasks.filter((el: iProps) => {
      return el.progress === true && el.done === false;
    });

    const getAllDone = getTasks.filter((el: iProps) => {
      return el.progress === true && el.done === true;
    });

    let data = {
      task: getAllTask,
      progress: getAllProgress,
      done: getAllDone,
    };

    return res.status(201).json({
      msg: "Tasks todo gotten successfully",
      data,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "Error creating new todo",
    });
  }
};
