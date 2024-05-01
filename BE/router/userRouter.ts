import { Router } from "express";
import {
  createTodo,
  createTodoDone,
  createTodoProgress,
  deleteTodo,
  getAll,
  getAllCombine,
} from "../controller/userController";

const router: Router = Router();

router.route("/create").post(createTodo);
router.route("/progress/:taskID").patch(createTodoProgress);
router.route("/done/:taskID").patch(createTodoDone);
router.route("/delete/:taskID").delete(deleteTodo);
router.route("/get-all").get(getAll);
router.route("/get-all-combine").get(getAllCombine);

export default router;
