"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response = {
    success: (req, res, message, status) => {
        const statusCode = status || 200;
        const statusMessage = message || "";
        res.status(status).send({
            error: false,
            status,
            body: message,
        });
    },
    error: (req, res, message, status) => {
        const statusCode = status || 500;
        const statusMessage = message || "Internal server error";
        res.status(statusCode).send({
            error: false,
            status,
            body: message,
        });
    },
};
exports.default = response;
//# sourceMappingURL=response.js.map