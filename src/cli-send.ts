import * as tools from "./tools"

console.log(process.argv)
// argv[0] = '/usr/bin/node'
// argv[1] = '/mnt/c/dev/neo/zl-neo-tools/js/cli-send.js'
let args = process.argv.slice(2)
type Params = {[key: string]: string}
let params = args.filter(x => x.startsWith('--')).map(x => x.substr(2).split('=')).reduce((prev, cur) => ({ ...prev, [cur[0]]: cur[1]}), <Params>{ })
console.log(params)

_send()

function _send()
{
	if (!params.from || !params.to || (!params.gas && !params.neo) || (!parseFloat(params.gas) && !parseFloat(params.neo)))
		return console.error("incomplete params!"), console.error(params)

	tools.initTestnet({ neoscan: "http://54.159.181.181:4000/api/main_net" })
	let client = tools.connect("http://54.159.181.181:30333")
	tools.constructMoneyTx(params.from, params.to, { ...params, gas: parseFloat(params.gas), neo: parseFloat(params.neo) })
		.then(tx => client.sendRawTransaction(tx)
			.then(x => console.log(`money sent! (${x})`)))
		.catch(err => console.error(err))
}