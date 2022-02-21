"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
const config_1 = __importDefault(require("./config"));
const sequelize_1 = require("./store/sequelize");
const logger_1 = require("./utils/logger");
const UserModel = __importStar(require("./api/components/user/store"));
const AuthModel = __importStar(require("./api/components/auth/store"));
const WalletModel = __importStar(require("./api/components/wallet/store"));
console.log("WELCOME TO EXTREME WALLET");
sequelize_1.Database.getInstance()
    .Init(config_1.default.mysql.ddbb, config_1.default.mysql.user, config_1.default.mysql.pass, {
    host: config_1.default.mysql.host,
    dialect: "mysql",
    logging: false,
})
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.log("Synchronizing data models with database");
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
    }
    catch (e) {
        logger_1.logger.error(e);
    }
    (0, api_1.InitApi)(config_1.default.api.port);
}));
//# sourceMappingURL=index.js.map