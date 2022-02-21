"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDoesntExistError = void 0;
const error_1 = __importDefault(require("../../utils/error"));
function UserDoesntExistError() {
    return new error_1.default({ code: "user_doesnt_exist", message: "User doesn't exist" }, 404);
}
exports.UserDoesntExistError = UserDoesntExistError;
//# sourceMappingURL=UserDoesntExistError.js.map