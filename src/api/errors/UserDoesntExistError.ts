import ApiError from "../../utils/error";

export function UserDoesntExistError() {
	return new ApiError(
		{ code: "user_doesnt_exist", message: "User doesn't exist" },
		404
	);
}
