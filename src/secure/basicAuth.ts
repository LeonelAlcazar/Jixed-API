import response from "../network/response";
import * as authController from "../api/components/auth/controller";
import { BadRequestError } from "../api/errors/BadRequestError";

export async function BasicAuth(req: any, res: any, next: any) {
	const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
	const [email, password] = Buffer.from(b64auth, "base64")
		.toString()
		.split(":");

	if (!email || !password) {
		response.error(req, res, BadRequestError("Bad request"), 400);
	} else {
		try {
			const user = await authController.GetUserByLogin(email, password);
			req.user = user.toJSON();
			next();
		} catch (e) {
			response.error(req, res, e, 401);
		}
	}
}
