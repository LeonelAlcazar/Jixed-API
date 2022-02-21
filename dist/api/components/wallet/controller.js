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
exports.SendTo = exports.GetTransactionsOf = exports.GetBalanceOf = exports.FindOne = void 0;
const NotFoundError_1 = require("../../errors/NotFoundError");
const GetAddress_1 = require("../../../Blockchain/GetAddress");
const store_1 = require("./store");
const CreateTransaction_1 = require("../../../bitcoin/CreateTransaction");
const BroadcastTransaction_1 = require("../../../Blockchain/BroadcastTransaction");
function FindOne(query) {
    return store_1.Wallet.findOne({
        attributes: [
            "id",
            "user_id",
            "address",
            "publicKey",
            "createdAt",
            "updatedAt",
        ],
        where: query,
    });
}
exports.FindOne = FindOne;
function GetBalanceOf(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const wallet = yield store_1.Wallet.findOne({
            attributes: [
                "id",
                "user_id",
                "address",
                "publicKey",
                "createdAt",
                "updatedAt",
            ],
            where: { user_id: user.id },
        });
        if (!wallet) {
            throw (0, NotFoundError_1.NotFoundError)();
        }
        const address = wallet.get("address");
        const balance = yield (0, GetAddress_1.GetAddress)(address);
        const serializedWallet = wallet.toJSON();
        return Object.assign(Object.assign({}, serializedWallet), balance);
    });
}
exports.GetBalanceOf = GetBalanceOf;
function GetTransactionsOf(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return [{}];
    });
}
exports.GetTransactionsOf = GetTransactionsOf;
function SendTo(user, address, amount, fee) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const wallet = yield store_1.Wallet.findOne({
                where: { user_id: user.id },
            });
            if (!wallet) {
                throw (0, NotFoundError_1.NotFoundError)();
            }
            const hex = yield (0, CreateTransaction_1.CreateTransaction)(wallet.get("WIF"), address, amount, fee || 260);
            return (0, BroadcastTransaction_1.BroadcastTransaction)(hex);
        }
        catch (e) {
            throw e;
        }
    });
}
exports.SendTo = SendTo;
//# sourceMappingURL=controller.js.map