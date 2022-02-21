"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncorrectPasswordError = void 0;
const error_1 = __importDefault(require("../../utils/error"));
function IncorrectPasswordError() {
    return new error_1.default({ code: "incorrect_password", message: "Incorrect password" }, 400);
}
exports.IncorrectPasswordError = IncorrectPasswordError;
//# sourceMappingURL=IncorrectPasswordError.js.map