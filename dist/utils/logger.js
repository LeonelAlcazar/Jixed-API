"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var TerminalColors;
(function (TerminalColors) {
    TerminalColors["Reset"] = "\u001B[0m";
    TerminalColors["Bright"] = "\u001B[1m";
    TerminalColors["Dim"] = "\u001B[2m";
    TerminalColors["Underscore"] = "\u001B[4m";
    TerminalColors["Blink"] = "\u001B[5m";
    TerminalColors["Reverse"] = "\u001B[7m";
    TerminalColors["Hidden"] = "\u001B[8m";
    TerminalColors["FgBlack"] = "\u001B[30m";
    TerminalColors["FgRed"] = "\u001B[31m";
    TerminalColors["FgGreen"] = "\u001B[32m";
    TerminalColors["FgYellow"] = "\u001B[33m";
    TerminalColors["FgBlue"] = "\u001B[34m";
    TerminalColors["FgMagenta"] = "\u001B[35m";
    TerminalColors["FgCyan"] = "\u001B[36m";
    TerminalColors["FgWhite"] = "\u001B[37m";
    TerminalColors["BgBlack"] = "\u001B[40m";
    TerminalColors["BgRed"] = "\u001B[41m";
    TerminalColors["BgGreen"] = "\u001B[42m";
    TerminalColors["BgYellow"] = "\u001B[43m";
    TerminalColors["BgBlue"] = "\u001B[44m";
    TerminalColors["BgMagenta"] = "\u001B[45m";
    TerminalColors["BgCyan"] = "\u001B[46m";
    TerminalColors["BgWhite"] = "\u001B[47m";
})(TerminalColors || (TerminalColors = {}));
exports.logger = {
    getDateText: () => {
        const date = new Date();
        return `${TerminalColors.FgBlack + date.toLocaleString()}`;
    },
    getInfoPrefix: () => {
        const date = new Date();
        return `${exports.logger.getDateText() + TerminalColors.FgBlue} [INFO]${TerminalColors.FgWhite}`;
    },
    getErrorPrefix: () => {
        const date = new Date();
        return `${exports.logger.getDateText() + TerminalColors.FgRed} [ERROR]${TerminalColors.FgWhite}`;
    },
    log: (...params) => {
        const text = [exports.logger.getInfoPrefix(), ...params].join(" ");
        console.log(text);
        return text;
    },
    error: (...params) => {
        const text = [exports.logger.getErrorPrefix(), ...params].join(" ");
        console.error(text);
        return text;
    },
};
//# sourceMappingURL=logger.js.map