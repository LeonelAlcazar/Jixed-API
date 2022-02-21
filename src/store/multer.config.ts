import multer from "multer";
import config from "../config";
import { v4 as uuidv4 } from "uuid";
import path from "path";

var PicStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(config.files.userUpload, "user_upload"));
	},
	filename: function (req, file, cb) {
		cb(null, "USERUPLOAD_" + uuidv4() + ".png");
	},
});

export const UserUpload = multer({ storage: PicStorage });
