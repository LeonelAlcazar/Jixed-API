import express from "express";
import { Request, Response, NextFunction } from "express";
import { BearerAuth } from "../../../secure/bearerAuth";
import * as controller from "./controller";
import response from "../../../network/response";

const router = express.Router();

router.get("/me", BearerAuth, GetMyWallet);
router.get("/transactions", BearerAuth, GetMyTransactions);

router.post("/send", BearerAuth, SendTransaction);

function GetMyWallet(req: Request, res: Response, next: NextFunction) {
	controller
		.GetBalanceOf(req.user)
		.then((wallet) => {
			response.success(req, res, wallet, 200);
		})
		.catch(next);
}

function GetMyTransactions(req: Request, res: Response, next: NextFunction) {
	controller
		.GetTransactionsOf(req.user)
		.then((transactions) => {
			response.success(req, res, transactions, 200);
		})
		.catch(next);
}

function SendTransaction(req: Request, res: Response, next: NextFunction) {
	controller
		.SendTo(req.user, req.body.address, req.body.amount, req.body.fee)
		.then((hex) => response.success(req, res, hex, 201))
		.catch(next);
}

export default router;
