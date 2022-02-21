import { Sequelize, Model, DataTypes } from "sequelize";
import { logger } from "../../../utils/logger";
import { Database } from "../../../store/sequelize";

export class Wallet extends Model {}

let synced = false;
export function Init() {
	Wallet.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			address: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			publicKey: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			WIF: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			sequelize: <Sequelize>Database.getInstance().sequelize,
			modelName: "wallet",
		}
	);
}

export function Sync(force: boolean) {
	logger.log("Synchronizing wallet model");
	if (!synced) {
		return Wallet.sync({ force })
			.then((v) => logger.log("Wallet model synchronized"))
			.catch((e) => logger.error("Database model error", e));
		synced = true;
	}
}
