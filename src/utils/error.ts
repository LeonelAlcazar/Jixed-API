export default class ApiError {
	code: string;
	message: string;
	statusCode: number;

	constructor(data: { code: string; message: string }, statusCode: number) {
		this.code = data.code;
		this.message = data.message;
		this.statusCode = statusCode;
	}
}
