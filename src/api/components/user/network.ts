import express from "express";
import { Request, Response, NextFunction } from "express";
import * as controller from "./controller";
import * as middleware from "./middlewares";
import response from "../../../network/response";
import { BearerAuth } from "../../../secure/bearerAuth";

const router = express.Router();

router.get("/me", BearerAuth, GetMyUser);
router.get("/:id", GetUser);

router.post("/", RegisterUser);

function GetUser(req: Request, res: Response, next: NextFunction) {
	controller
		.FindOne({ id: req.params.id })
		.then((user) => {
			response.success(req, res, user, 200);
		})
		.catch(next);
}

function GetMyUser(req: Request, res: Response, next: NextFunction) {
	controller
		.FindOne({ id: req.user.id })
		.then((user) => {
			response.success(req, res, user, 200);
		})
		.catch(next);
}

function RegisterUser(req: Request, res: Response, next: NextFunction) {
	controller
		.RegisterUser(req.body)
		.then((user) => {
			response.success(req, res, user, 201);
		})
		.catch(next);
}

export default router;
