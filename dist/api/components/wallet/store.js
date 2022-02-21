"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sync = exports.Init = exports.Wallet = void 0;
const sequelize_1 = require("sequelize");
const logger_1 = require("../../../utils/logger");
const sequelize_2 = require("../../../store/sequelize");
class Wallet extends sequelize_1.Model {
}
exports.Wallet = Wallet;
let synced = false;
function Init() {
    Wallet.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        address: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        publicKey: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        WIF: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        sequelize: sequelize_2.Database.getInstance().sequelize,
        modelName: "wallet",
    });
}
exports.Init = Init;
function Sync(force) {
    logger_1.logger.log("Synchronizing wallet model");
    if (!synced) {
        return Wallet.sync({ force })
            .then((v) => logger_1.logger.log("Wallet model synchronized"))
            .catch((e) => logger_1.logger.error("Database model error", e));
        synced = true;
    }
}
exports.Sync = Sync;
//# sourceMappingURL=store.js.map