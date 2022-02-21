import ApiError from "../../../utils/error";
import config from "../../../config";
import JWT from "../../../utils/jwt";
import { Auth } from "./store";
import bcrypt from "bcrypt";
import { User } from "../user/store";
import { UserDoesntExistError } from "../../errors/UserDoesntExistError";
import { IncorrectPasswordError } from "../../errors/IncorrectPasswordError";

const jwt = new JWT(config.secrets.auth);

export async function GetJWT(user: any) {
	const token = jwt.sign({ id: user.id }, { expiresIn: "7d" });

	return token;
}

export async function GetUserByToken(token: string) {
	try {
		const decoded: any = jwt.verify(token);
		const user = await User.findOne({ where: { id: decoded.id } });
		return user;
	} catch (e) {
		throw e;
	}
}

export async function GetUserByLogin(email: string, password: string) {
	const auth = await Auth.findOne({ where: { email: email } });
	if (!auth) {
		throw UserDoesntExistError();
	}

	const passwordHash = <string>auth.get("password");
	const correctPassword = await bcrypt.compare(password, passwordHash);

	if (!correctPassword) {
		throw IncorrectPasswordError();
	}
	const user_id = <string>auth.get("user_id");
	const user = await User.findOne({ where: { id: user_id } });

	return user;
}
