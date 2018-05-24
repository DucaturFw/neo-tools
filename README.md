# CLI tools for NEO blockchain

## Installation
Prerequisites: Node.js

`yarn install`

## Sending NEO & GAS
`yarn send-money --gas=1 --neo=1 --from=<PRIVATE KEY WIF> --to=<WALLET ADDRESS>`

## Sending raw transaction
`cat tx.hex | yarn sign-send-tx --wif=<PRIVATE KEY WIF>`

Assumes that you have raw transaction hex in `tx.hex`