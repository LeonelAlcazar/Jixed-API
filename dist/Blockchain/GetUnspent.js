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
exports.GetUnspent = void 0;
const axios_1 = __importDefault(require("axios"));
const stringToSatoshi_1 = require("../utils/stringToSatoshi");
const config_1 = __importDefault(require("../config"));
function GetUnspent(address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`${config_1.default.blockchain.API_URL}/get_tx_unspent/BTC/${address}`);
            const unspent_data = response.data.data;
            console.log("RAW DDATA", unspent_data);
            const low_data_txs = unspent_data.txs;
            const txs = yield Promise.all(low_data_txs.map((tx) => __awaiter(this, void 0, void 0, function* () {
                const tx_response = yield axios_1.default.get(`${config_1.default.blockchain.API_URL}/get_tx/BTC/${tx.txid}`);
                const tx_data = tx_response.data.data;
                let inputs = tx_data.inputs;
                let outputs = tx_data.outputs;
                inputs = inputs.map((input) => {
                    return Object.assign(Object.assign({}, input), { address: input.address, value: (0, stringToSatoshi_1.stringToSatoshi)(input.value) });
                });
                outputs = outputs.map((output) => {
                    return Object.assign(Object.assign({}, output), { address: output.address, value: (0, stringToSatoshi_1.stringToSatoshi)(output.value) });
                });
                console.log(outputs);
                return Object.assign(Object.assign({}, tx_data), { output_no: tx.output_no, inputs,
                    outputs, txid: tx_data.txid, tx_hex: tx_data.tx_hex, network_fee: (0, stringToSatoshi_1.stringToSatoshi)(tx_data.network_fee) });
            })));
            console.log("TXS FIN", txs);
            return txs;
        }
        catch (e) {
            throw e.response.data;
        }
    });
}
exports.GetUnspent = GetUnspent;
//# sourceMappingURL=GetUnspent.js.map