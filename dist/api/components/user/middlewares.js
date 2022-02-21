"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserValidator = void 0;
const validator_1 = require("../../../utils/validator");
const CREATE_USER = [
    {
        param_key: "email",
        type: "string",
        required: true,
        validator_functions: [validator_1.validateEmail],
    },
    {
        param_key: "name",
        type: "string",
        required: true,
        validator_functions: [(0, validator_1.lengthBounds)(1, 50)],
    },
    {
        param_key: "password",
        type: "string",
        required: true,
        validator_functions: [(0, validator_1.lengthBounds)(1, 255)],
    },
];
exports.createUserValidator = (0, validator_1.validateParams)(CREATE_USER);
//# sourceMappingURL=middlewares.js.map