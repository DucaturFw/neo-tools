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
console.log(process.argv);
// argv[0] = '/usr/bin/node'
// argv[1] = '/mnt/c/dev/neo/zl-neo-tools/js/cli-send.js'
var args = process.argv.slice(2);
var params = args.filter(function (x) { return x.startsWith('--'); }).map(function (x) { return x.substr(2).split('='); }).reduce(function (prev, cur) {
    return (__assign({}, prev, (_a = {}, _a[cur[0]] = cur[1], _a)));
    var _a;
}, {});
console.log(params);
_send();
function _send() {
    if (!params.from || !params.to || (!params.gas && !params.neo) || (!parseFloat(params.gas) && !parseFloat(params.neo)))
        return console.error("incomplete params!"), console.error(params);
    tools.initTestnet({ neoscan: "http://54.159.181.181:4000/api/main_net" });
    var client = tools.connect("http://54.159.181.181:30333");
    tools.constructMoneyTx(params.from, params.to, __assign({}, params, { gas: parseFloat(params.gas), neo: parseFloat(params.neo) }))
        .then(function (tx) { return client.sendRawTransaction(tx)
        .then(function (x) { return console.log("money sent! (" + x + ")"); }); })
        .catch(function (err) { return console.error(err); });
}
