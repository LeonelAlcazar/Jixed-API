"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parserFunctions = {
    boolean: (str) => str === "true",
    number: (str) => Number(str),
};
function queryParser(schema) {
    return (req, res, next) => {
        const querys = req.query;
        for (const k of Object.keys(schema)) {
            if (querys[k] !== undefined && querys[k] !== "") {
                req.query[k] = parserFunctions[schema[k]](querys[k]);
            }
        }
        next();
    };
}
exports.default = queryParser;
//# sourceMappingURL=queryParser.js.map