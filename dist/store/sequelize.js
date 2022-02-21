"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const sequelize_1 = require("sequelize");
const logger_1 = require("../utils/logger");
class Database {
    constructor() {
        this.sequelize = null;
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    Init(database, username, password, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sequelize = new sequelize_1.Sequelize(database, username, password, options);
            logger_1.logger.log("Trying to connect to the database");
            try {
                yield this.sequelize.authenticate();
                logger_1.logger.log("Database connection successful");
            }
            catch (error) {
                logger_1.logger.error("Failed database connection");
                logger_1.logger.error(error);
                yield this.Init(database, username, password, options);
            }
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=sequelize.js.map