"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function parseArgv(argv) {
    // argv[0] = '/usr/bin/node'
    // argv[1] = '/mnt/c/dev/neo/zl-neo-tools/js/cli-send.js'
    var args = argv.slice(2);
    var params = args.filter(function (x) { return x.startsWith('--'); }).map(function (x) { return x.substr(2).split('='); }).reduce(function (prev, cur) {
        return (__assign({}, prev, (_a = {}, _a[cur[0]] = cur[1], _a)));
        var _a;
    }, {});
    return params;
}
exports.parseArgv = parseArgv;
function loadConfig() {
    var config = require('../data/testnet-config.json');
    return __assign({}, config);
}
exports.loadConfig = loadConfig;
function promiseLog(p) {
    p.then(function (x) { return console.log(x); }).catch(function (err) { return console.log(err); });
}
exports.promiseLog = promiseLog;
