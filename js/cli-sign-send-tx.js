"use strict";
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
var txHex = '';
process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function (buf) { return txHex += buf; });
process.stdin.on('end', function () {
    txHex = txHex.trim();
    console.log(txHex);
    _go();
});
// _go()
function _go() {
    if (!params.wif)
        return console.error("wif key missing!"), console.error(params);
    if (!txHex)
        return console.error("no tx data passed!");
    var cfg = cli_utils_1.loadConfig();
    tools.initTestnet({ neoscan: cfg.neoscan });
    var client = tools.connect(cfg.rpc);
    var txn = tools.signRawTx(params.wif, txHex);
    console.log(txn);
    console.log(txn.hash);
    cli_utils_1.promiseLog(client.sendRawTransaction(txn));
}
