import express from "express";
import { Request, Response, NextFunction } from "express";

import authRouter from "../components/auth/network";
import userRouter from "../components/user/network";
import walletRouter from "../components/wallet/network";

const router = express.Router();

router.get("/ping", Ping);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/wallet", walletRouter);

function Ping(req: Request, res: Response, next: NextFunction) {
	res.send("pong");
}

export default router;
