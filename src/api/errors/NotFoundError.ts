import ApiError from "../../utils/error";

export function NotFoundError() {
	return new ApiError({ code: "not_found", message: "Not found" }, 404);
}
