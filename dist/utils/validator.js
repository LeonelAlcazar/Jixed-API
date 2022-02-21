"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validateNickname = exports.validatePhones = exports.validateEmail = exports.enumValidation = exports.lengthBounds = void 0;
const response_1 = __importDefault(require("../network/response"));
function lengthBounds(min, max) {
    return (param) => {
        return param.length >= min && param.length <= max;
    };
}
exports.lengthBounds = lengthBounds;
function enumValidation(...params) {
    return (param) => {
        return params.includes(param);
    };
}
exports.enumValidation = enumValidation;
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}
exports.validateEmail = validateEmail;
function validatePhones(phone) {
    const re = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    return re.test(phone);
}
exports.validatePhones = validatePhones;
function validateNickname(nickname) {
    const re = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
    return re.test(nickname);
}
exports.validateNickname = validateNickname;
const validateParams = (requestParams) => {
    return (req, res, next) => {
        const body = req.body;
        for (const param of requestParams) {
            if (checkParamPreset(Object.keys(req.body), param)) {
                const reqParam = body[param.param_key];
                if (param.exclude) {
                    delete req.body[param.param_key];
                    continue;
                }
                if (!checkParamType(reqParam, param)) {
                    return response_1.default.error(req, res, {
                        code: "validation_failed",
                        message: `${param.param_key} is of type ` +
                            `${typeof reqParam} but should be ${param.type}`,
                    }, 400);
                }
                else {
                    if (!runValidators(reqParam, param)) {
                        return response_1.default.error(req, res, {
                            code: "failed_validation",
                            message: `Validation failed for ${param.param_key}`,
                        }, 400);
                    }
                }
            }
            else if (param.required) {
                return response_1.default.error(req, res, {
                    code: "failed_validation",
                    message: `Missing Parameter ${param.param_key}`,
                }, 400);
            }
        }
        next();
    };
};
exports.validateParams = validateParams;
const checkParamPreset = (reqParams, paramObj) => {
    return reqParams.includes(paramObj.param_key);
};
const checkParamType = (reqParam, paramObj) => {
    const reqParamType = typeof reqParam;
    return reqParamType === paramObj.type;
};
const runValidators = (reqParam, paramObj) => {
    const functions = paramObj.validator_functions || [];
    for (const validator of functions) {
        if (!validator(reqParam)) {
            return false;
        }
    }
    return true;
};
//# sourceMappingURL=validator.js.map