"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const error_1 = __importDefault(require("../../utils/error"));
function NotFoundError() {
    return new error_1.default({ code: "not_found", message: "Not found" }, 404);
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=NotFoundError.js.map