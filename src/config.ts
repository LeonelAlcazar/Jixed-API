import path from "path";
import dotenv from "dotenv";

dotenv.config();

export default {
	secrets: {
		auth: process.env.AUTH_SECRET || "authsecret",
		aes: process.env.AES,
	},
	api: {
		port: parseInt(process.env.PORT) || 8080,
	},
	files: {
		userUpload:
			process.env.USER_UPLOAD_ABSOLUTE_PATH ||
			path.join(__dirname, "../media"),
		client: process.env.CLIENT_PATH || path.join(__dirname, "../public/"),
	},
	mysql: {
		host: process.env.MYSQL_HOST || "localhost",
		user: process.env.MYSQL_USER || "root",
		pass: process.env.MYSQL_PASS || "root",
		ddbb: process.env.MYSQL_DDBB || "exwallet",
	},
	blockchain: {
		API_URL: "https://chain.so/api/v2",
		PLATFORM_FEE_ADDRESS:
			"bc1qzs2lgl5v9w9nsjv0k8639x8p2ker088m535xfj8u0vr256zj49rsnauxw4",
	},
};
