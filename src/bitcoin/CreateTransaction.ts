import * as bitcoin from "bitcoinjs-lib";
import { ECPairFactory } from "ecpair";
import { GetUnspent } from "../Blockchain/GetUnspent";
import * as ecc from "tiny-secp256k1";
const ECPair = ECPairFactory(ecc);

export async function CreateTransaction(
	WIF: string,
	address: string,
	amount: number,
	networkFee: number
) {
	try {
		const keyPair = ECPair.fromWIF(WIF);
		const wallet = bitcoin.payments.p2sh({
			redeem: bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey }),
		});
		const finalAmount = amount + networkFee;
		const unspent_data = await GetUnspent(wallet.address);
		let utxos: any[] = [];
		let total = finalAmount;
		let inputAmount = 0;
		while (total > 0) {
			const utxo = unspent_data.pop();
			if (utxo) {
				utxos.push(utxo);
				total -= utxo.outputs[utxo.output_no].value;
				inputAmount += utxo.outputs[utxo.output_no].value;
			} else {
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
	} catch (e) {
		throw e;
	}
}
