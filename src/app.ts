import Neon, { rpc } from "@cityofzion/neon-js"

let client = Neon.create.rpcClient("http://localhost:30333")
client.getBlockCount().then(x => console.log(`block count: ${x}`)).catch(e => console.error(e))
// client.sendRawTransaction

let acc = Neon.create.account("KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr")
console.log(acc)
let acc2 = Neon.create.account("6PYNNkTwYMEZjeZN1UHhHK8hRf5A1eBXyZsiHsEPEkjg5tWzjeyfHYQ7Ax")

let secretData = require('../data/top-secret.json')
console.assert(secretData.simple_seq === "simple_seq_12345_#", "couldn't load secret data!")

acc2 = acc2.decrypt(secretData.accountTests.pass)
console.assert(acc2.address === "AKQ8cCUoE99ncnRRbaYPit3pV3g58A6FJk", `different address! ${acc2.address}`)
console.assert(acc2.WIF === secretData.accountTests.wif, `different WIF! ${acc2.WIF}`)

console.log(acc2)
console.log(acc2.address)