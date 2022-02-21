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
exports.GetAddress = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
function GetAddress(address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`${config_1.default.blockchain.API_URL}/get_address_balance/BTC/${address}`);
            const address_balance_data = response.data.data;
            const confirmed_balance = parseFloat(address_balance_data.confirmed_balance) * 1e8;
            const unconfirmed_balance = parseFloat(address_balance_data.unconfirmed_balance) * 1e8;
            return {
                confirmed_balance,
                unconfirmed_balance,
            };
        }
        catch (e) {
            throw e.response.data;
        }
    });
}
exports.GetAddress = GetAddress;
//# sourceMappingURL=GetAddress.js.map