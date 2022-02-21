"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    secrets: {
        auth: process.env.AUTH_SECRET || "authsecret",
        aes: process.env.AES,
    },
    api: {
        port: parseInt(process.env.PORT) || 8080,
    },
    files: {
        userUpload: process.env.USER_UPLOAD_ABSOLUTE_PATH ||
            path_1.default.join(__dirname, "../media"),
        client: process.env.CLIENT_PATH || path_1.default.join(__dirname, "../public/"),
    },
    mysql: {
        host: process.env.MYSQL_HOST || "localhost",
        user: process.env.MYSQL_USER || "root",
        pass: process.env.MYSQL_PASS || "root",
        ddbb: process.env.MYSQL_DDBB || "exwallet",
    },
    blockchain: {
        API_URL: "https://chain.so/api/v2",
        PLATFORM_FEE_ADDRESS: "bc1qzs2lgl5v9w9nsjv0k8639x8p2ker088m535xfj8u0vr256zj49rsnauxw4",
    },
};
//# sourceMappingURL=config.js.map