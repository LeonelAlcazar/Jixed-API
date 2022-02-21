import response from "./response";

function errors(err: any, req: any, res: any, next: CallableFunction): void {
	if (err.statusCode === undefined || err.statusCode === 500) {
		console.log(err);
	}

	const message = err.message || {
		code: "internal_server_error",
		message: "Internal server error",
	};
	const status = err.statusCode || 500;

	response.error(req, res, message, status);
}

export default errors;
