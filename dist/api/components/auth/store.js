"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sync = exports.Init = exports.Auth = void 0;
const sequelize_1 = require("sequelize");
const logger_1 = require("../../../utils/logger");
const sequelize_2 = require("../../../store/sequelize");
class Auth extends sequelize_1.Model {
}
exports.Auth = Auth;
let synced = false;
function Init() {
    Auth.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        sequelize: sequelize_2.Database.getInstance().sequelize,
        modelName: "auth",
    });
}
exports.Init = Init;
function Sync(force) {
    logger_1.logger.log("Synchronizing auth model");
    if (!synced) {
        return Auth.sync({ force })
            .then((v) => logger_1.logger.log("Auth model synchronized"))
            .catch((e) => logger_1.logger.error("Database model error", e));
        synced = true;
    }
}
exports.Sync = Sync;
//# sourceMappingURL=store.js.map