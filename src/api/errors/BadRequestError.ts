import ApiError from "../../utils/error";

export function BadRequestError(message: string) {
	return new ApiError({ code: "bad_request", message: message }, 400);
}
