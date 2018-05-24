import * as tools from "./tools"
import { parseArgv, loadConfig, promiseLog } from "./cli-utils";

// console.log(process.argv)
let params = parseArgv(process.argv) as { wif: string }
let txHex = ''
process.stdin.resume()
process.stdin.setEncoding('utf-8')
process.stdin.on('data', buf => txHex += buf)
process.stdin.on('end', () =>
{
	txHex = txHex.trim()
	console.log(txHex)
	
	_go()
})

// _go()

function _go()
{
	if (!params.wif)
		return console.error("wif key missing!"), console.error(params)
	if (!txHex)
		return console.error("no tx data passed!")
	
	let cfg = loadConfig()
	tools.initTestnet({ neoscan: cfg.neoscan })
	let client = tools.connect(cfg.rpc)

	let txn = tools.signRawTx(params.wif, txHex)
	console.log(txn)
	console.log(txn.hash)
	promiseLog(client.sendRawTransaction(txn))
}