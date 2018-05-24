import Neon, { rpc, api, tx } from "@cityofzion/neon-js"
import { Account } from "@cityofzion/neon-js/src/wallet";
import { Transaction } from "@cityofzion/neon-js/src/transactions";

const NET_NAME = 'PrivateNet'

export function initTestnet({ neoscan, neonDB }: { neoscan?: string, neonDB?: string })
{
	const config = {
		name: NET_NAME,
		extra: {
			neoscan,
			neonDB,
		}
	}
	
	const privateNet = new rpc.Network(config)
	
	;(Neon as any).add.network(privateNet)
}
export function connect(url: string): rpc.RPCClient
{
	let client = Neon.create.rpcClient(url)
	return client
}
export function accFromEncrypted(key: string, pass: string): Account
{
	return Neon.create.account(key).decrypt(pass)
}
export function constructMoneyTx(from: string | Account, to: string, params: {gas?: number, neo?: number, remark?: string}): Promise<Transaction>
{
	// let acc2addr = "AKQ8cCUoE99ncnRRbaYPit3pV3g58A6FJk"
	// console.log(api.makeIntent({ NEO: 1, GAS: 1 }, acc2addr))
	let txn = Neon.create.tx()
	// api.makeIntent({ NEO: 1, GAS: 1 }, acc2addr).forEach(x => txn.addOutput(x.assetId, x.value, acc2addr))
	if (params.neo)
		txn.addOutput('NEO', params.neo, to)
	if (params.gas)
		txn.addOutput('GAS', params.gas, to)
	if (params.remark)
		txn.addRemark(params.remark)

	let acc = (typeof from === "string") ? Neon.create.account(from) : from
	
	return api.neoscan.getBalance(NET_NAME, acc.address).then(bal =>
	{
		// console.log(JSON.stringify(bal))
		txn.calculate(bal)
		txn.sign(acc)
		console.log(txn)
		console.log(txn.serialize)
		console.log(txn.hash)

		return txn
	})
}
export function signRawTx(acc: string | Account, contractTxHex: string): tx.Transaction
{
	let txn = new tx.Transaction(tx.deserializeTransaction(contractTxHex))
	let acc2 = (typeof acc === "string") ? Neon.create.account(acc) : acc
	txn.sign(acc2)
	// console.log(txn.hash)
	return txn

	// client.sendRawTransaction(txn).then(x => console.log(x)).catch(err => console.error(err))
}
export function txDeployContract(author: string | Account, contractHex: string)
{
	let acc = (typeof author === "string") ? Neon.create.account(author) : author
	return api.neoscan.getBalance(NET_NAME, acc.address).then(balance =>
	{
		throw "not implemented yet:\n1. wtf should go to outputs?\n2.wtf is override?"
		let txn = tx.Transaction.createInvocationTx(balance, [], contractHex, 500, {})
		return txn
	})
}