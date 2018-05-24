import Neon, { rpc, api, tx } from "@cityofzion/neon-js"
import * as tools from "./tools"

tools.initTestnet({ neoscan: 'http://localhost:4000/api/main_net' })

let client = tools.connect("http://localhost:30333")

client.getBlockCount().then(x => console.log(`block count: ${x}`)).catch(e => console.error(e))
// client.sendRawTransaction

let acc = Neon.create.account("KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr")
console.log(acc)

let secretData = require('../data/top-secret.json')
console.assert(secretData.simple_seq === "simple_seq_12345_#", "couldn't load secret data!")

let acc2 = tools.accFromEncrypted("6PYNNkTwYMEZjeZN1UHhHK8hRf5A1eBXyZsiHsEPEkjg5tWzjeyfHYQ7Ax", secretData.accountTests.pass)

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

const EMPTY_CONTRACT_SCRIPT = '23646f6573206e6f7468696e672c206a757374206f6e6520656d707479206d6574686f64107a6c756d657240676d61696c2e636f6d067a6c756d657203312e30135465737420456d70747920436f6e74726163740002ff00001851c56b61516c766b00527ac46203006c766b00c3616c756668134e656f2e436f6e74726163742e437265617465'
const RAW_TX_WITH_EMPTY_CONTRACT = 'd1018723646f6573206e6f7468696e672c206a757374206f6e6520656d707479206d6574686f64107a6c756d657240676d61696c2e636f6d067a6c756d657203312e30135465737420456d70747920436f6e74726163740002ff00001851c56b61516c766b00527ac46203006c766b00c3616c756668134e656f2e436f6e74726163742e437265617465001a7118020000000001e0af909a7ec1fb08476d9834cf174d3affb1bd62a28bfc195c810ce268520c48010001e72d286979ee6cb1b7e65dfddfb2e384100b8d148e7758de42e4168b71792c6000ca9a3b0000000027c3d71a87b7cc901a5b1ac1611dfaf54cf749f1'

parseTransaction()

sendContract()

function sendContract()
{
	let txn = tools.signRawTx(acc2, RAW_TX_WITH_EMPTY_CONTRACT)
	console.log(txn.hash)

	// client.sendRawTransaction(txn).then(x => console.log(x)).catch(err => console.error(err))
}
function parseTransaction()
{
	let rawtx = RAW_TX_WITH_EMPTY_CONTRACT
	let txn = tx.deserializeTransaction(rawtx)
	console.log(txn)
}
// uncomment to send transaction
// sendSimpleTxn()
function sendSimpleTxn()
{
	tools.constructMoneyTx(acc, "AKQ8cCUoE99ncnRRbaYPit3pV3g58A6FJk", { gas: 1, neo: 1, remark: "whatever"})
		.then(txn => client.sendRawTransaction(txn).then(x => console.log(x)))
		.catch(err => console.error(err))
}
