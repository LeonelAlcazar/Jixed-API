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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicAuth = void 0;
const response_1 = __importDefault(require("../network/response"));
const authController = __importStar(require("../api/components/auth/controller"));
const BadRequestError_1 = require("../api/errors/BadRequestError");
function BasicAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
        const [email, password] = Buffer.from(b64auth, "base64")
            .toString()
            .split(":");
        if (!email || !password) {
            response_1.default.error(req, res, (0, BadRequestError_1.BadRequestError)("Bad request"), 400);
        }
        else {
            try {
                const user = yield authController.GetUserByLogin(email, password);
                req.user = user.toJSON();
                next();
            }
            catch (e) {
                response_1.default.error(req, res, e, 401);
            }
        }
    });
}
exports.BasicAuth = BasicAuth;
//# sourceMappingURL=basicAuth.js.map