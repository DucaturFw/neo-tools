"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var neon_js_1 = __importDefault(require("@cityofzion/neon-js"));
var NET_NAME = 'PrivateNet';
function initTestnet(_a) {
    var neoscan = _a.neoscan, neonDB = _a.neonDB;
    var config = {
        name: NET_NAME,
        extra: {
            neoscan: neoscan,
            neonDB: neonDB,
        }
    };
    var privateNet = new neon_js_1.rpc.Network(config);
    neon_js_1.default.add.network(privateNet);
}
exports.initTestnet = initTestnet;
function connect(url) {
    var client = neon_js_1.default.create.rpcClient(url);
    return client;
}
exports.connect = connect;
function accFromEncrypted(key, pass) {
    return neon_js_1.default.create.account(key).decrypt(pass);
}
exports.accFromEncrypted = accFromEncrypted;
function constructMoneyTx(from, to, params) {
    // let acc2addr = "AKQ8cCUoE99ncnRRbaYPit3pV3g58A6FJk"
    // console.log(api.makeIntent({ NEO: 1, GAS: 1 }, acc2addr))
    var txn = neon_js_1.default.create.tx();
    // api.makeIntent({ NEO: 1, GAS: 1 }, acc2addr).forEach(x => txn.addOutput(x.assetId, x.value, acc2addr))
    if (params.neo)
        txn.addOutput('NEO', params.neo, to);
    if (params.gas)
        txn.addOutput('GAS', params.gas, to);
    if (params.remark)
        txn.addRemark(params.remark);
    var acc = (typeof from === "string") ? neon_js_1.default.create.account(from) : from;
    return getBalance(acc.address).then(function (bal) {
        // console.log(JSON.stringify(bal))
        txn.calculate(bal);
        txn.sign(acc);
        console.log(txn);
        console.log(txn.serialize);
        console.log(txn.hash);
        return txn;
    });
}
exports.constructMoneyTx = constructMoneyTx;
function getBalance(address) {
    return neon_js_1.api.neoscan.getBalance(NET_NAME, address);
}
exports.getBalance = getBalance;
function signRawTx(acc, contractTxHex) {
    var txn = new neon_js_1.tx.Transaction(neon_js_1.tx.deserializeTransaction(contractTxHex));
    var acc2 = (typeof acc === "string") ? neon_js_1.default.create.account(acc) : acc;
    txn.sign(acc2);
    // console.log(txn.hash)
    return txn;
    // client.sendRawTransaction(txn).then(x => console.log(x)).catch(err => console.error(err))
}
exports.signRawTx = signRawTx;
function txDeployContract(author, contractHex) {
    var acc = (typeof author === "string") ? neon_js_1.default.create.account(author) : author;
    return neon_js_1.api.neoscan.getBalance(NET_NAME, acc.address).then(function (balance) {
        throw "not implemented yet:\n1. wtf should go to outputs?\n2.wtf is override?";
        var txn = neon_js_1.tx.Transaction.createInvocationTx(balance, [], contractHex, 500, {});
        return txn;
    });
}
exports.txDeployContract = txDeployContract;
