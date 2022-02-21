import ApiError from "../../utils/error";

export function EmailInUseError() {
	return new ApiError(
		{ code: "email_in_use", message: "Email is already in use" },
		400
	);
}
