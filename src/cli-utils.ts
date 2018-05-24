export function parseArgv(argv: string[])
{
	// argv[0] = '/usr/bin/node'
	// argv[1] = '/mnt/c/dev/neo/zl-neo-tools/js/cli-send.js'
	let args = argv.slice(2)
	type Params = {[key: string]: string}
	let params = args.filter(x => x.startsWith('--')).map(x => x.substr(2).split('=')).reduce((prev, cur) => ({ ...prev, [cur[0]]: cur[1]}), <Params>{ })
	return params
}
export function loadConfig(): { rpc: string, neoscan: string }
{
	let config = require('../data/testnet-config.json')
	return { ...config }
}
export function promiseLog<T>(p: Promise<T>)
{
	p.then(x => console.log(x)).catch(err => console.log(err))
}