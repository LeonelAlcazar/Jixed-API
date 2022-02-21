import { Sequelize, Model, DataTypes } from "sequelize";
import { logger } from "../../../utils/logger";
import { Database } from "../../../store/sequelize";

export class User extends Model {}

let synced = false;
export function Init() {
	User.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize: <Sequelize>Database.getInstance().sequelize,
			modelName: "user",
		}
	);
}

export function Sync(force: boolean) {
	logger.log("Synchronizing user model");
	if (!synced) {
		return User.sync({ force })
			.then((v) => logger.log("User model synchronized"))
			.catch((e) => logger.error("Database model error", e));
		synced = true;
	}
}
