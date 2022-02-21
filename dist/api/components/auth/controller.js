"use strict";
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
exports.GetUserByLogin = exports.GetUserByToken = exports.GetJWT = void 0;
const config_1 = __importDefault(require("../../../config"));
const jwt_1 = __importDefault(require("../../../utils/jwt"));
const store_1 = require("./store");
const bcrypt_1 = __importDefault(require("bcrypt"));
const store_2 = require("../user/store");
const UserDoesntExistError_1 = require("../../errors/UserDoesntExistError");
const IncorrectPasswordError_1 = require("../../errors/IncorrectPasswordError");
const jwt = new jwt_1.default(config_1.default.secrets.auth);
function GetJWT(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = jwt.sign({ id: user.id }, { expiresIn: "7d" });
        return token;
    });
}
exports.GetJWT = GetJWT;
function GetUserByToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const decoded = jwt.verify(token);
            const user = yield store_2.User.findOne({ where: { id: decoded.id } });
            return user;
        }
        catch (e) {
            throw e;
        }
    });
}
exports.GetUserByToken = GetUserByToken;
function GetUserByLogin(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const auth = yield store_1.Auth.findOne({ where: { email: email } });
        if (!auth) {
            throw (0, UserDoesntExistError_1.UserDoesntExistError)();
        }
        const passwordHash = auth.get("password");
        const correctPassword = yield bcrypt_1.default.compare(password, passwordHash);
        if (!correctPassword) {
            throw (0, IncorrectPasswordError_1.IncorrectPasswordError)();
        }
        const user_id = auth.get("user_id");
        const user = yield store_2.User.findOne({ where: { id: user_id } });
        return user;
    });
}
exports.GetUserByLogin = GetUserByLogin;
//# sourceMappingURL=controller.js.map