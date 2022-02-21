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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = exports.FindOne = exports.FindAll = void 0;
const store_1 = require("./store");
const sequelize_1 = require("sequelize");
const crypt_1 = require("../../../utils/crypt");
const EmailInUseError_1 = require("../../../api/errors/EmailInUseError");
const store_2 = require("../auth/store");
const store_3 = require("../wallet/store");
const GenerateWallet_1 = require("../../../bitcoin/GenerateWallet");
function FindAll(query) {
    return store_1.User.findAll({
        include: [
            {
                model: store_3.Wallet,
                attributes: ["id", "user_id", "address", "publicKey"],
            },
        ],
        where: query,
    });
}
exports.FindAll = FindAll;
function FindOne(query) {
    return store_1.User.findOne({
        include: [
            {
                model: store_3.Wallet,
                attributes: ["id", "user_id", "address", "publicKey"],
            },
        ],
        where: query,
    });
}
exports.FindOne = FindOne;
function RegisterUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userWithEmailOrUsername = yield store_1.User.findAll({
                where: {
                    [sequelize_1.Op.or]: [{ email: data.email }],
                },
            });
            if (userWithEmailOrUsername.length > 0) {
                throw (0, EmailInUseError_1.EmailInUseError)();
            }
            const user = yield store_1.User.create({
                email: data.email,
                name: data.name,
            });
            const passwordHash = yield (0, crypt_1.hash)(data.password);
            const auth = yield store_2.Auth.create({
                user_id: user.get("id"),
                email: data.email,
                password: passwordHash,
            });
            const walletData = (0, GenerateWallet_1.GenerateWallet)();
            const wallet = yield store_3.Wallet.create({
                user_id: user.get("id"),
                address: walletData.address,
                publicKey: walletData.publicKey,
                WIF: walletData.WIF,
            });
            return user;
        }
        catch (e) {
            throw e;
        }
    });
}
exports.RegisterUser = RegisterUser;
//# sourceMappingURL=controller.js.map