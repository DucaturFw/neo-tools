import * as tools from "./tools"
import { parseArgv, loadConfig } from "./cli-utils";

// console.log(process.argv)
let params = parseArgv(process.argv) as { from: string, to: string, gas?: string, neo: string }
// as { from: string, to: string } & ({ gas: string } | { neo: string })

_send()

function _send()
{
	if (!params.from || !params.to || (!params.gas && !params.neo) || (!parseFloat(params.gas || "") && !parseFloat(params.neo || "")))
		return console.error("incomplete params!"), console.error(params)

	let cfg = loadConfig()
	tools.initTestnet({ neoscan: cfg.neoscan })
	let client = tools.connect(cfg.rpc)
	
	tools.constructMoneyTx(params.from, params.to, { ...params as any, gas: parseFloat(params.gas || "0"), neo: parseFloat(params.neo || "0") })
		.then(tx => client.sendRawTransaction(tx)
			.then(x => console.log(`money sent! (${x})`)))
		.catch(err => console.error(err))
}