import cors from "cors";
import express from "express";
import http from "http";
import errors from "../network/errors";
import path from "path";

import v1 from "./v1";

import config from "../config";
import { logger } from "../utils/logger";

export function InitApi(port: number) {
	const app = express();
	const server = http.createServer(app);

	app.use(cors());

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use(express.static(config.files.userUpload));
	app.use(express.static(config.files.client));

	// Routes here
	app.use("/api/v1", v1);
	app.use("*", (req, res) => {
		res.sendFile(path.join(config.files.client, "index.html"));
	});

	app.use(errors);

	server.listen(port, () => {
		logger.log(`HTTP server listen on port ${port}`);
	});
}
