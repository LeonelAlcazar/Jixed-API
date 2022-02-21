"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("./response"));
function errors(err, req, res, next) {
    if (err.statusCode === undefined || err.statusCode === 500) {
        console.log(err);
    }
    const message = err.message || {
        code: "internal_server_error",
        message: "Internal server error",
    };
    const status = err.statusCode || 500;
    response_1.default.error(req, res, message, status);
}
exports.default = errors;
//# sourceMappingURL=errors.js.map