import {
	validateParams,
	lengthBounds,
	validatePhones,
	validateEmail,
	IParam,
	validateNickname,
} from "../../../utils/validator";

const CREATE_USER: IParam[] = [
	{
		param_key: "email",
		type: "string",
		required: true,
		validator_functions: [validateEmail],
	},
	{
		param_key: "name",
		type: "string",
		required: true,
		validator_functions: [lengthBounds(1, 50)],
	},
	{
		param_key: "password",
		type: "string",
		required: true,
		validator_functions: [lengthBounds(1, 255)],
	},
];
export const createUserValidator = validateParams(CREATE_USER);
