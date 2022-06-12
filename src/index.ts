import { InitApi } from "./api";
import config from "./config";
import { Database } from "./store/sequelize";

import { logger } from "./utils/logger";

import * as UserModel from "./api/components/user/store";
import * as AuthModel from "./api/components/auth/store";
import * as WalletModel from "./api/components/wallet/store";

console.log("WELCOME TO EXTREME WALLET");

Database.getInstance()
	.Init(config.mysql.ddbb, config.mysql.user, config.mysql.pass, {
		host: config.mysql.host,
		port: config.mysql.port,
		dialect: "mysql",

		logging: false,
	})
	.then(async () => {
		logger.log("Synchronizing data models with database");
		try {
			UserModel.Init();
			AuthModel.Init();
			WalletModel.Init();

			UserModel.User.hasOne(AuthModel.Auth, { foreignKey: "user_id" });
			UserModel.User.hasOne(WalletModel.Wallet, {
				foreignKey: "user_id",
			});

			UserModel.Sync(false);
			AuthModel.Sync(false);
			WalletModel.Sync(false);
		} catch (e) {
			logger.error(e);
		}

		InitApi(config.api.port);
	});
