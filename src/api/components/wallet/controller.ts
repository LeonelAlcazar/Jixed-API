import { NotFoundError } from "../../errors/NotFoundError";
import { GetAddress } from "../../../Blockchain/GetAddress";
import { Wallet } from "./store";
import { CreateTransaction } from "../../../bitcoin/CreateTransaction";
import { BroadcastTransaction } from "../../../Blockchain/BroadcastTransaction";

export function FindOne(query: { [field: string]: any }) {
	return Wallet.findOne({
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

export async function GetBalanceOf(user: { id: string }) {
	const wallet = await Wallet.findOne({
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
		throw NotFoundError();
	}

	const address = <string>wallet.get("address");
	const balance = await GetAddress(address);
	const serializedWallet = wallet.toJSON();
	return {
		...serializedWallet,
		...balance,
	};
}

export async function GetTransactionsOf(user: { id: string }) {
	return [{}];
}

export async function SendTo(
	user: { id: string },
	address: string,
	amount: number,
	fee?: number
) {
	try {
		const wallet = await Wallet.findOne({
			where: { user_id: user.id },
		});

		if (!wallet) {
			throw NotFoundError();
		}

		const hex = await CreateTransaction(
			<string>wallet.get("WIF"),
			address,
			amount,
			fee || 260
		);
		return BroadcastTransaction(hex);
	} catch (e) {
		throw e;
	}
}
