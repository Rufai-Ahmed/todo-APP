"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const console_1 = require("console");
const userRouter_1 = __importDefault(require("./router/userRouter"));
const mainApp = (app) => {
    try {
        app.use("/api/", userRouter_1.default);
        app.get("/", (req, res) => {
            try {
                return res.status(200).json({
                    msg: "Welcome to the API",
                });
            }
            catch (error) {
                (0, console_1.log)(error);
            }
        });
    }
    catch (error) {
        return error;
    }
};
exports.mainApp = mainApp;
