import axios from "axios";
import config from "../config";

export async function BroadcastTransaction(tx_hex: string) {
	try {
		const response = await axios.post(
			`${config.blockchain.API_URL}/send_tx/BTC`,
			{
				tx_hex,
			}
		);

		const tx_hash = response.data.data.tx_hash;

		return tx_hash;
	} catch (e) {
		throw e.response.data;
	}
}
