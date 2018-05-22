"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var neon_js_1 = __importDefault(require("@cityofzion/neon-js"));
var client = neon_js_1.default.create.rpcClient("http://localhost:30333");
client.getBlockCount().then(function (x) { return console.log("block count: " + x); }).catch(function (e) { return console.error(e); });
// client.sendRawTransaction
var acc = neon_js_1.default.create.account("KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr");
console.log(acc);
var acc2 = neon_js_1.default.create.account("6PYNNkTwYMEZjeZN1UHhHK8hRf5A1eBXyZsiHsEPEkjg5tWzjeyfHYQ7Ax");
var secretData = require('../data/top-secret.json');
console.assert(secretData.simple_seq === "simple_seq_12345_#", "couldn't load secret data!");
/* acc2 = acc2.decrypt(secretData.accountTests.pass)
console.assert(acc2.address === "AKQ8cCUoE99ncnRRbaYPit3pV3g58A6FJk", `different address! ${acc2.address}`)
console.assert(acc2.WIF === secretData.accountTests.wif, `different WIF! ${acc2.WIF}`)

console.log(acc2)
console.log(acc2.address) */
// Neon.do.sendAsset("TestNet", acc2.address, acc.address, { GAS: 1, NEO: 1 })
configureTestnet();
// Neon.get.balance("PrivateNet", acc.address).then(x => console.log(x)).catch(err => console.log(err))
// api.neoscan.getBalance("PrivateNet", acc.address).then(x => console.log(x)).catch(err => console.log(err))
client.getAccountState(acc.address).then(function (x) { return console.log(x); }).catch(function (err) { return console.log(err); });
// client.getAssetState('0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b').then(x => console.log(x)).catch(err => console.log(err))
// client.getAssetState('0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7').then(x => console.log(x)).catch(err => console.log(err))
// client.sendRawTransaction(Neon.create.tx())
var acc2addr = "AKQ8cCUoE99ncnRRbaYPit3pV3g58A6FJk";
// console.log(api.makeIntent({ NEO: 1, GAS: 1 }, acc2addr))
var txn = neon_js_1.default.create.tx();
// api.makeIntent({ NEO: 1, GAS: 1 }, acc2addr).forEach(x => txn.addOutput(x.assetId, x.value, acc2addr))
txn.addOutput('NEO', 1, acc2addr);
txn.addOutput('GAS', 1, acc2addr);
txn.addRemark("whatever");
neon_js_1.api.neoscan.getBalance("PrivateNet", acc.address).then(function (bal) {
    // console.log(JSON.stringify(bal))
    txn.calculate(bal);
    txn.sign(acc);
    console.log(txn);
    console.log(txn.serialize);
    console.log(txn.hash);
    // uncomment to send transaction
    // client.sendRawTransaction(txn).then(x => console.log(x)).catch(err => console.error(err))
});
function configureTestnet() {
    var config = {
        name: 'PrivateNet',
        extra: {
            neoscan: 'http://localhost:4000/api/main_net'
        }
    };
    var privateNet = new neon_js_1.rpc.Network(config);
    neon_js_1.default.add.network(privateNet);
    // Neon.api.neoscan.getBalance('PrivateNet', address)
    // .then(res => console.log(res))
}
