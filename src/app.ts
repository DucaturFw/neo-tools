import Neon, { rpc, api, tx } from "@cityofzion/neon-js"

let client = Neon.create.rpcClient("http://localhost:30333")
client.getBlockCount().then(x => console.log(`block count: ${x}`)).catch(e => console.error(e))
// client.sendRawTransaction

let acc = Neon.create.account("KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr")
console.log(acc)
let acc2 = Neon.create.account("6PYNNkTwYMEZjeZN1UHhHK8hRf5A1eBXyZsiHsEPEkjg5tWzjeyfHYQ7Ax")

let secretData = require('../data/top-secret.json')
console.assert(secretData.simple_seq === "simple_seq_12345_#", "couldn't load secret data!")

/* acc2 = acc2.decrypt(secretData.accountTests.pass)
console.assert(acc2.address === "AKQ8cCUoE99ncnRRbaYPit3pV3g58A6FJk", `different address! ${acc2.address}`)
console.assert(acc2.WIF === secretData.accountTests.wif, `different WIF! ${acc2.WIF}`)

console.log(acc2)
console.log(acc2.address) */

// Neon.do.sendAsset("TestNet", acc2.address, acc.address, { GAS: 1, NEO: 1 })
configureTestnet()
// Neon.get.balance("PrivateNet", acc.address).then(x => console.log(x)).catch(err => console.log(err))

// api.neoscan.getBalance("PrivateNet", acc.address).then(x => console.log(x)).catch(err => console.log(err))
client.getAccountState(acc.address).then(x => console.log(x)).catch(err => console.log(err))
// client.getAssetState('0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b').then(x => console.log(x)).catch(err => console.log(err))
// client.getAssetState('0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7').then(x => console.log(x)).catch(err => console.log(err))
// client.sendRawTransaction(Neon.create.tx())
let acc2addr = "AKQ8cCUoE99ncnRRbaYPit3pV3g58A6FJk"
// console.log(api.makeIntent({ NEO: 1, GAS: 1 }, acc2addr))
let txn = Neon.create.tx()
// api.makeIntent({ NEO: 1, GAS: 1 }, acc2addr).forEach(x => txn.addOutput(x.assetId, x.value, acc2addr))
txn.addOutput('NEO', 1, acc2addr)
txn.addOutput('GAS', 1, acc2addr)
txn.addRemark("whatever")
api.neoscan.getBalance("PrivateNet", acc.address).then(bal =>
{
	// console.log(JSON.stringify(bal))
	txn.calculate(bal)
	txn.sign(acc)
	console.log(txn)
	console.log(txn.serialize)
	console.log(txn.hash)

	// uncomment to send transaction
	// client.sendRawTransaction(txn).then(x => console.log(x)).catch(err => console.error(err))
})

function configureTestnet()
{
	const config = {
		name: 'PrivateNet',
		extra: {
			neoscan: 'http://localhost:4000/api/main_net'
		}
	}
	const privateNet = new rpc.Network(config)
	
	;(Neon as any).add.network(privateNet)

	// Neon.api.neoscan.getBalance('PrivateNet', address)
	// .then(res => console.log(res))
}