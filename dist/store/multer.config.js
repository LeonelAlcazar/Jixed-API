"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const config_1 = __importDefault(require("../config"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
var PicStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(config_1.default.files.userUpload, "user_upload"));
    },
    filename: function (req, file, cb) {
        cb(null, "USERUPLOAD_" + (0, uuid_1.v4)() + ".png");
    },
});
exports.UserUpload = (0, multer_1.default)({ storage: PicStorage });
//# sourceMappingURL=multer.config.js.map