import { User } from "./store";
import { Op } from "sequelize";
import ApiError from "../../../utils/error";
import { hash } from "../../../utils/crypt";
import { EmailInUseError } from "../../../api/errors/EmailInUseError";
import { Auth } from "../auth/store";
import { Wallet } from "../wallet/store";
import { GenerateWallet } from "../../../bitcoin/GenerateWallet";

export function FindAll(query: { [field: string]: any }) {
	return User.findAll({
		include: [
			{
				model: Wallet,
				attributes: ["id", "user_id", "address", "publicKey"],
			},
		],
		where: query,
	});
}

export function FindOne(query: { [field: string]: any }) {
	return User.findOne({
		include: [
			{
				model: Wallet,
				attributes: ["id", "user_id", "address", "publicKey"],
			},
		],
		where: query,
	});
}

export async function RegisterUser(data: any) {
	try {
		const userWithEmailOrUsername = await User.findAll({
			where: {
				[Op.or]: [{ email: data.email }],
			},
		});

		if (userWithEmailOrUsername.length > 0) {
			throw EmailInUseError();
		}

		const user = await User.create({
			email: data.email,
			name: data.name,
		});

		const passwordHash = await hash(data.password);

		const auth = await Auth.create({
			user_id: user.get("id"),
			email: data.email,
			password: passwordHash,
		});

		const walletData = GenerateWallet();

		const wallet = await Wallet.create({
			user_id: user.get("id"),
			address: walletData.address,
			publicKey: walletData.publicKey,
			WIF: walletData.WIF,
		});

		return user;
	} catch (e) {
		throw e;
	}
}
