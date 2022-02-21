"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitApi = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const errors_1 = __importDefault(require("../network/errors"));
const path_1 = __importDefault(require("path"));
const v1_1 = __importDefault(require("./v1"));
const config_1 = __importDefault(require("../config"));
const logger_1 = require("../utils/logger");
function InitApi(port) {
    const app = (0, express_1.default)();
    const server = http_1.default.createServer(app);
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.static(config_1.default.files.userUpload));
    app.use(express_1.default.static(config_1.default.files.client));
    // Routes here
    app.use("/api/v1", v1_1.default);
    app.use("*", (req, res) => {
        res.sendFile(path_1.default.join(config_1.default.files.client, "index.html"));
    });
    app.use(errors_1.default);
    server.listen(port, () => {
        logger_1.logger.log(`HTTP server listen on port ${port}`);
    });
}
exports.InitApi = InitApi;
//# sourceMappingURL=index.js.map