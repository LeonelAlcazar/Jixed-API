"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller = __importStar(require("./controller"));
const response_1 = __importDefault(require("../../../network/response"));
const bearerAuth_1 = require("../../../secure/bearerAuth");
const router = express_1.default.Router();
router.get("/me", bearerAuth_1.BearerAuth, GetMyUser);
router.get("/:id", GetUser);
router.post("/", RegisterUser);
function GetUser(req, res, next) {
    controller
        .FindOne({ id: req.params.id })
        .then((user) => {
        response_1.default.success(req, res, user, 200);
    })
        .catch(next);
}
function GetMyUser(req, res, next) {
    controller
        .FindOne({ id: req.user.id })
        .then((user) => {
        response_1.default.success(req, res, user, 200);
    })
        .catch(next);
}
function RegisterUser(req, res, next) {
    controller
        .RegisterUser(req.body)
        .then((user) => {
        response_1.default.success(req, res, user, 201);
    })
        .catch(next);
}
exports.default = router;
//# sourceMappingURL=network.js.map