"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.route("/create").post(userController_1.createTodo);
router.route("/progress/:taskID").patch(userController_1.createTodoProgress);
router.route("/done/:taskID").patch(userController_1.createTodoDone);
router.route("/delete/:taskID").delete(userController_1.deleteTodo);
router.route("/get-all").get(userController_1.getAll);
router.route("/get-all-combine").get(userController_1.getAllCombine);
exports.default = router;
