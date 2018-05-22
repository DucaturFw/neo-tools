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
acc2 = acc2.decrypt(secretData.accountTests.pass);
console.assert(acc2.address === "AKQ8cCUoE99ncnRRbaYPit3pV3g58A6FJk", "different address! " + acc2.address);
console.assert(acc2.WIF === secretData.accountTests.wif, "different WIF! " + acc2.WIF);
console.log(acc2);
console.log(acc2.address);
