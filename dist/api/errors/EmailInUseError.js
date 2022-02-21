"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailInUseError = void 0;
const error_1 = __importDefault(require("../../utils/error"));
function EmailInUseError() {
    return new error_1.default({ code: "email_in_use", message: "Email is already in use" }, 400);
}
exports.EmailInUseError = EmailInUseError;
//# sourceMappingURL=EmailInUseError.js.map