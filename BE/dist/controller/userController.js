"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCombine = exports.getAll = exports.createTodoDone = exports.deleteTodo = exports.createTodoProgress = exports.createTodo = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const console_1 = require("console");
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const createTask = yield userModel_1.default.create({ title });
        return res.status(201).json({
            msg: "Created new todo successfully",
            data: createTask,
        });
    }
    catch (error) {
        (0, console_1.log)(error);
        return res.status(404).json({
            msg: "Error creating new todo",
        });
    }
});
exports.createTodo = createTodo;
const createTodoProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskID } = req.params;
        const { title } = req.body;
        const createTask = yield userModel_1.default.findByIdAndUpdate(taskID, { progress: true }, { new: true });
        return res.status(201).json({
            msg: "Created new todo successfully",
            data: createTask,
        });
    }
    catch (error) {
        return res.status(404).json({
            msg: "Error creating new todo",
        });
    }
});
exports.createTodoProgress = createTodoProgress;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskID } = req.params;
        const { title } = req.body;
        const createTask = yield userModel_1.default.findByIdAndDelete(taskID);
        return res.status(201).json({
            msg: "deleted new todo successfully",
            data: createTask,
        });
    }
    catch (error) {
        return res.status(404).json({
            msg: "Error creating new todo",
        });
    }
});
exports.deleteTodo = deleteTodo;
const createTodoDone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskID } = req.params;
        const { title } = req.body;
        const findTask = yield userModel_1.default.findById(taskID);
        if (findTask === null || findTask === void 0 ? void 0 : findTask.progress) {
            const createTask = yield userModel_1.default.findByIdAndUpdate(taskID, { done: true }, { new: true });
            return res.status(201).json({
                msg: "Created new todo successfully",
                data: createTask,
            });
        }
        else {
            return res.status(404).json({
                msg: "You should have progressed before task being done",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            msg: "Error creating new todo",
        });
    }
});
exports.createTodoDone = createTodoDone;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getTasks = yield userModel_1.default.find();
        return res.status(201).json({
            msg: "Created new todo successfully",
            data: getTasks,
        });
    }
    catch (error) {
        return res.status(404).json({
            msg: "Error creating new todo",
        });
    }
});
exports.getAll = getAll;
const getAllCombine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getTasks = yield userModel_1.default.find();
        const getAllTask = getTasks.filter((el) => {
            return el.progress === false && el.done === false;
        });
        const getAllProgress = getTasks.filter((el) => {
            return el.progress === true && el.done === false;
        });
        const getAllDone = getTasks.filter((el) => {
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
    }
    catch (error) {
        return res.status(404).json({
            msg: "Error creating new todo",
        });
    }
});
exports.getAllCombine = getAllCombine;
