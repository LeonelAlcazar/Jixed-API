"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const error_1 = __importDefault(require("../../utils/error"));
function BadRequestError(message) {
    return new error_1.default({ code: "bad_request", message: message }, 400);
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=BadRequestError.js.map