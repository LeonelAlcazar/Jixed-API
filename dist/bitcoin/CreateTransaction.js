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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransaction = void 0;
const bitcoin = __importStar(require("bitcoinjs-lib"));
const ecpair_1 = require("ecpair");
const GetUnspent_1 = require("../Blockchain/GetUnspent");
const ecc = __importStar(require("tiny-secp256k1"));
const ECPair = (0, ecpair_1.ECPairFactory)(ecc);
function CreateTransaction(WIF, address, amount, networkFee) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const keyPair = ECPair.fromWIF(WIF);
            const wallet = bitcoin.payments.p2sh({
                redeem: bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey }),
            });
            const finalAmount = amount + networkFee;
            const unspent_data = yield (0, GetUnspent_1.GetUnspent)(wallet.address);
            let utxos = [];
            let total = finalAmount;
            let inputAmount = 0;
            while (total > 0) {
                const utxo = unspent_data.pop();
                if (utxo) {
                    utxos.push(utxo);
                    total -= utxo.outputs[utxo.output_no].value;
                    inputAmount += utxo.outputs[utxo.output_no].value;
                }
                else {
                    throw new Error("Not enough funds");
                }
            }
            console.log(inputAmount, total);
            const change = inputAmount - finalAmount;
            const psbt = new bitcoin.Psbt({ network: bitcoin.networks.bitcoin });
            utxos.forEach((utxo) => {
                let inputData = {
                    hash: utxo.txid,
                    index: utxo.output_no,
                    nonWitnessUtxo: Buffer.from(utxo.tx_hex, "hex"),
                    /*witnessUtxo: {
                        script: Buffer.from(
                            utxo.outputs[utxo.output_no].script,
                            "hex"
                        ),
                        value: utxo.outputs[utxo.output_no].value,
                    },*/
                    redeemScript: wallet.redeem.output,
                };
                psbt.addInput(inputData);
            });
            psbt.addOutput({
                address: address,
                value: amount,
            });
            if (change > 0) {
                const changeAddress = bitcoin.payments.p2pkh({
                    pubkey: keyPair.publicKey,
                    network: bitcoin.networks.bitcoin,
                });
                const changeOutput = {
                    value: change,
                    script: changeAddress.output,
                };
                psbt.addOutput(changeOutput);
            }
            psbt.signAllInputs(keyPair);
            psbt.finalizeAllInputs();
            return psbt.extractTransaction().toHex();
        }
        catch (e) {
            throw e;
        }
    });
}
exports.CreateTransaction = CreateTransaction;
//# sourceMappingURL=CreateTransaction.js.map