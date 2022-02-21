"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const network_1 = __importDefault(require("../components/auth/network"));
const network_2 = __importDefault(require("../components/user/network"));
const network_3 = __importDefault(require("../components/wallet/network"));
const router = express_1.default.Router();
router.get("/ping", Ping);
router.use("/auth", network_1.default);
router.use("/user", network_2.default);
router.use("/wallet", network_3.default);
function Ping(req, res, next) {
    res.send("pong");
}
exports.default = router;
//# sourceMappingURL=index.js.map