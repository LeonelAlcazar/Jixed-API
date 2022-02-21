"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError {
    constructor(data, statusCode) {
        this.code = data.code;
        this.message = data.message;
        this.statusCode = statusCode;
    }
}
exports.default = ApiError;
//# sourceMappingURL=error.js.map