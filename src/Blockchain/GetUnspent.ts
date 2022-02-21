import axios from "axios";
import { stringToSatoshi } from "../utils/stringToSatoshi";
import config from "../config";

export async function GetUnspent(address: string) {
	try {
		const response = await axios.get(
			`${config.blockchain.API_URL}/get_tx_unspent/BTC/${address}`
		);

		const unspent_data = response.data.data;
		console.log("RAW DDATA", unspent_data);

		const low_data_txs: any[] = unspent_data.txs;
		const txs = await Promise.all(
			low_data_txs.map(async (tx) => {
				const tx_response = await axios.get(
					`${config.blockchain.API_URL}/get_tx/BTC/${tx.txid}`
				);

				const tx_data = tx_response.data.data;

				let inputs: any[] = tx_data.inputs;
				let outputs: any[] = tx_data.outputs;

				inputs = inputs.map((input: any) => {
					return {
						...input,
						address: input.address,
						value: stringToSatoshi(input.value),
					};
				});

				outputs = outputs.map((output: any) => {
					return {
						...output,
						address: output.address,
						value: stringToSatoshi(output.value),
					};
				});

				console.log(outputs);

				return {
					...tx_data,
					output_no: tx.output_no,
					inputs,
					outputs,
					txid: tx_data.txid,
					tx_hex: tx_data.tx_hex,
					network_fee: stringToSatoshi(tx_data.network_fee),
				};
			})
		);
		console.log("TXS FIN", txs);
		return txs;
	} catch (e) {
		throw e.response.data;
	}
}
