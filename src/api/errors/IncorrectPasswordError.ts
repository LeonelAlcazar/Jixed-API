import ApiError from "../../utils/error";

export function IncorrectPasswordError() {
	return new ApiError(
		{ code: "incorrect_password", message: "Incorrect password" },
		400
	);
}
