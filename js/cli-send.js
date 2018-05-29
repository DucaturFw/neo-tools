"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var tools = __importStar(require("./tools"));
var cli_utils_1 = require("./cli-utils");
// console.log(process.argv)
var params = cli_utils_1.parseArgv(process.argv);
// as { from: string, to: string } & ({ gas: string } | { neo: string })
_send();
function _send() {
    if (!params.from || !params.to || (!params.gas && !params.neo) || (!parseFloat(params.gas || "") && !parseFloat(params.neo || "")))
        return console.error("incomplete params!"), console.error(params);
    var cfg = cli_utils_1.loadConfig();
    tools.initTestnet({ neoscan: cfg.neoscan });
    var client = tools.connect(cfg.rpc);
    var data = __assign({}, params);
    if (params.gas)
        data.gas = parseFloat(params.gas);
    if (params.neo)
        data.neo = parseFloat(params.neo);
    tools.constructMoneyTx(params.from, params.to, data)
        .then(function (tx) { return client.sendRawTransaction(tx)
        .then(function (x) { return console.log("money sent! (" + x + ")"); }); })
        .catch(function (err) { return console.error(err); });
}
