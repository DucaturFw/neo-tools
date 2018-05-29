"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var neon_js_1 = __importDefault(require("@cityofzion/neon-js"));
var tools = __importStar(require("./tools"));
var cli_utils_1 = require("./cli-utils");
var config = cli_utils_1.loadConfig();
tools.initTestnet({ neoscan: config.neoscan });
neon_js_1.api.setApiSwitch(0);
neon_js_1.api.setSwitchFreeze(true);
var client = tools.connect(config.rpc);
client.getBlockCount().then(function (x) { return console.log("block count: " + x); }).catch(function (e) { return console.error(e); });
// client.sendRawTransaction
var acc = neon_js_1.default.create.account("KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr");
console.log(acc);
var secretData = require('../data/top-secret.json');
console.assert(secretData.simple_seq === "simple_seq_12345_#", "couldn't load secret data!");
var acc2 = tools.accFromEncrypted("6PYNNkTwYMEZjeZN1UHhHK8hRf5A1eBXyZsiHsEPEkjg5tWzjeyfHYQ7Ax", secretData.accountTests.pass);
/* acc2 = acc2.decrypt(secretData.accountTests.pass)
console.assert(acc2.address === "AKQ8cCUoE99ncnRRbaYPit3pV3g58A6FJk", `different address! ${acc2.address}`)
console.assert(acc2.WIF === secretData.accountTests.wif, `different WIF! ${acc2.WIF}`) */
// console.log(acc2)
// console.log(acc2.address)
// Neon.do.sendAsset("TestNet", acc2.address, acc.address, { GAS: 1, NEO: 1 })
// Neon.get.balance("PrivateNet", acc.address).then(x => console.log(x)).catch(err => console.log(err))
// api.neoscan.getBalance("PrivateNet", acc.address).then(x => console.log(x)).catch(err => console.log(err))
// client.getAccountState(acc.address).then(x => console.log(x)).catch(err => console.log(err))
// client.getAssetState('0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b').then(x => console.log(x)).catch(err => console.log(err))
// client.getAssetState('0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7').then(x => console.log(x)).catch(err => console.log(err))
// client.sendRawTransaction(Neon.create.tx())
var EMPTY_CONTRACT_SCRIPT = '23646f6573206e6f7468696e672c206a757374206f6e6520656d707479206d6574686f64107a6c756d657240676d61696c2e636f6d067a6c756d657203312e30135465737420456d70747920436f6e74726163740002ff00001851c56b61516c766b00527ac46203006c766b00c3616c756668134e656f2e436f6e74726163742e437265617465';
var RAW_TX_WITH_EMPTY_CONTRACT = 'd1018723646f6573206e6f7468696e672c206a757374206f6e6520656d707479206d6574686f64107a6c756d657240676d61696c2e636f6d067a6c756d657203312e30135465737420456d70747920436f6e74726163740002ff00001851c56b61516c766b00527ac46203006c766b00c3616c756668134e656f2e436f6e74726163742e437265617465001a7118020000000001e0af909a7ec1fb08476d9834cf174d3affb1bd62a28bfc195c810ce268520c48010001e72d286979ee6cb1b7e65dfddfb2e384100b8d148e7758de42e4168b71792c6000ca9a3b0000000027c3d71a87b7cc901a5b1ac1611dfaf54cf749f1';
// parseTransaction()
// sendContract()
invokeContract();
function sendContract() {
    var txn = tools.signRawTx(acc2, RAW_TX_WITH_EMPTY_CONTRACT);
    console.log(txn.hash);
    // client.sendRawTransaction(txn).then(x => console.log(x)).catch(err => console.error(err))
}
function parseTransaction() {
    var rawtx = RAW_TX_WITH_EMPTY_CONTRACT;
    var txn = neon_js_1.tx.deserializeTransaction(rawtx);
    console.log(txn);
}
// uncomment to send transaction
// sendSimpleTxn()
function sendSimpleTxn() {
    tools.constructMoneyTx(acc, "AKQ8cCUoE99ncnRRbaYPit3pV3g58A6FJk", { gas: 1, neo: 1, remark: "whatever" })
        .then(function (txn) { return client.sendRawTransaction(txn).then(function (x) { return console.log(x); }); })
        .catch(function (err) { return console.error(err); });
}
function _err_(arg) {
    console.log("error:");
    console.error(arg);
}
function invokeContract() {
    function toScriptString(scriptHash) {
        return function (op) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var script = {
                scriptHash: scriptHash,
                operation: op,
                args: args
            };
            return neon_js_1.default.create.script(script);
        };
    }
    function ctrInvoker(scriptHash) {
        var stringy = toScriptString(scriptHash);
        return function (op) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return neon_js_1.rpc.Query
                .invokeScript(stringy.apply(void 0, [op].concat(args)))
                .execute(config.rpc)
                .then(function (res) {
                if (!res || !res.result || res.result.state.includes('FAULT'))
                    throw res;
                console.assert(res.result.state.includes('HALT'), "contract not halted!\n" + JSON.stringify(res.result, null, 2) + "\n" + res.result.state);
                return res.result;
            });
        };
    }
    // let ctrAddr = `30b32f11e0e5b25e7dccc41f8c81d09bfb7740daa30a4ebef8fcefd26b9fb13f`
    var ctrHash = "9fcec75b2854d18db3e7ee0893027caae99bbab6"; // v5
    ctrHash = "c9fb1d2bcd177f0bdcb220f99e6b030429edb61d"; // v6
    ctrHash = "513e636ff564f9198fec4e4bbade77d8e52b0e4b"; // v7
    ctrHash = "0xae2f7f1cfbe9cc033103a83dd3ef8a26396c14f9"; // v7.2
    ctrHash = "0x8d66322c4f11631313e6be759822b8665cf2b659"; // v8
    if (ctrHash.startsWith('0x'))
        ctrHash = ctrHash.substr(2);
    // Neon.create.account(ctrAddr).scriptHash
    var makeScript = toScriptString(ctrHash);
    var callContract = ctrInvoker(ctrHash);
    // callContract('name').then(x => console.log(`name: ${neon_u.hexstring2str(x.stack[0].value)}`))
    /**
        byte[] toAddress = (byte[])args[0];
        BigInteger tokenAmount = (BigInteger)args[1];
        byte[] fromBlockchain = (byte[])args[2];
        byte[] fromTxId = (byte[])args[3];
     */
    /* console.log([
        neon_u.str2hexstring(acc.address),
        neon_u.num2fixed8(1337),
        neon_u.str2hexstring("ETH"),
        'a15236effe5059a46af33d41ec64f3e312e5080101c2e59a999158b8ff9c4021'
    ])
    return */
    /* callContract('testwit6').then(x => console.log(x)).catch(err =>
    {
        _err_(err)
        // console.log(JSON.stringify(err, null, 2))
        console.log(err.result.stack)
        // console.log(err.result.stack[0].value.map(x => neon_u.hexstring2str(x.value)))
        // console.log(err.result.stack.map(x => neon_u.hexstring2str(x.value)))
    })
    return */
    /* callContract('mintTokens4',
        neon_u.str2hexstring(acc.address),
        neon_u.num2fixed8(1337),
        neon_u.str2hexstring("ETH"), // 34 = ETH (because fuck you that's why)
        // neon_u.str2hexstring(neon_u.hexstring2str('a15236effe5059a46af33d41ec64f3e312e5080101c2e59a999158b8ff9c4021'))
        '6465616462656566'
    ).then(x => console.log(x)).catch(err =>
    {
        _err_(err)
        // console.log(JSON.stringify(err, null, 2))
        console.log(err.result.stack)
        console.log(err.result.stack[0].value.map(x => neon_u.hexstring2str(x.value)))
        // console.log(err.result.stack.map(x => neon_u.hexstring2str(x.value)))
    })
    return */
    // callContract('deploy').then(x => console.log(x)).catch(_err_)
    function sendTx(script) {
        return neon_js_1.default.doInvoke({
            net: config.neoscan,
            url: config.rpc,
            script: script,
            account: acc2,
            gas: 1,
        }).then(function (tx) { return tx.response; });
    }
    // sendTx(makeScript('deploy')).then(x => console.log(x)).catch(_err_)
    // return
    sendTx(makeScript('mintTokens', acc2.scriptHash, neon_js_1.u.num2fixed8(1337), neon_js_1.u.str2hexstring("ETH"), // 34 = ETH (because fuck you that's why)
    'a15236effe5059a46af33d41ec64f3e312e5080101c2e59a999158b8ff9c4021')).then(function (x) { return console.log(x); }).catch(_err_);
    // sendTx(makeScript('name')).then(x => console.log(x)).catch(_err_)
    /* Neon.doInvoke({
        net: config.neoscan,
        url: config.rpc,
        script: makeScript('name'),
        account: acc,
        gas: 1,
    }).then(x => console.log(x)).catch(_err_) */
    // let txn = Neon.create.tx()
    // txn.scripts.push({ invocationScript:  })
    // tools.signRawTx(acc, )
    // client.sendRawTransaction(txn).then(x => console.log(x)).catch(_err_)
    /* let script = {
        scriptHash: ctrHash,
        operation: 'name',
        args: []
    }
    console.log(`query on ${config.rpc}`)
    rpc.Query.invokeScript(Neon.create.script(script)).execute(config.rpc).then((res: IJRPCResp<IInvokeResponse>) =>
    {
        if (!res || !res.result || res.result.script.includes('FAULT'))
            return console.error(res)
        
        console.log(res.result)
        console.assert(res.result.stack.length == 1)
        console.assert(res.result.stack[0].type == 'ByteArray')
        // console.log(`total supply: ${neon_u.Fixed8.fromReverseHex(res.result.stack[0].value)}`)
        console.log(`name: ${neon_u.hexstring2str(res.result.stack[0].value)}`)
    }).catch(err => console.error(err)) */
    /* tools.getBalance(acc.address).then(bal =>
    {
        // console.log(JSON.stringify(bal))
        let txn = Neon.create.invocationTx(bal, )
        txn.calculate(bal)
        txn.sign(acc)
        console.log(txn)
        console.log(txn.serialize)
        console.log(txn.hash)

        return txn
    }) */
}
