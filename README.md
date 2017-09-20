

# Wishereum

An wishing well on the Ethereum blockchain (Rinkeby).

## Getting Started

Clone the repo and run `npm install`.

You may need a few additional modules such as `nws`, `concurrently`, `truffle` and `testrpc`.

## Running the App

You can run the app using the Rinkeby smart contract currently deployed by simply running `npm start`.

This will run a gulp watch and livereload on the vuejs application.

Changes to the smart contract will not be reflected in the app when running this way.

## Running with TestRPC

If you'd like to edit, test and deploy the smart contract again you will need to run testrpc.

3 bash windows:

1. `testrpc -m 'your meta mask mnemonic phrase here ...'` from any directory, runs your local test blockchain
2. `npm run rpc` from the root directory will run gulp watch and livereload
3. `truffle migrate --reset` from the root directory will update your smart contracts on the testrpc chain

In `src/js/app.js` remove the `contractAddress` field from the global `window.APP` object.

This will force `web3-utils.js getContract` function to use the testrpc deployed address instead.

Also MetaMask should be connected to `localhost:8545` the testrpc network