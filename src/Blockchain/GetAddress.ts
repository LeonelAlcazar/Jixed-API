import axios from "axios";
import config from "../config";

export async function GetAddress(address: string) {
	try {
		const response = await axios.get(
			`${config.blockchain.API_URL}/get_address_balance/BTC/${address}`
		);

		const address_balance_data = response.data.data;
		const confirmed_balance =
			parseFloat(address_balance_data.confirmed_balance) * 1e8;
		const unconfirmed_balance =
			parseFloat(address_balance_data.unconfirmed_balance) * 1e8;

		return {
			confirmed_balance,
			unconfirmed_balance,
		};
	} catch (e) {
		throw e.response.data;
	}
}
