

/**************************************
* The following utilities depend on web3 and truffle-contract
**************************************/
/**************************************
* Get Web3
**************************************/
const getWeb3 = (web3 = window.web3) => {
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/"));
    //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  window.web3 = web3;
  return web3;
};
/**************************************
* Get Network
**************************************/
const getNetwork = (web3 = window.web3) => new Promise((resolve, reject) => {
  if (!web3) {
    console.log('No web3 instance provided');
    return;
  }
  let id, name;
  web3.version.getNetwork((err, networkId) => {
    if (err) {
      reject(err); return;
    }
    id = parseInt(networkId);
    switch (id) {
      case 1: name = 'mainnet'; break;
      case 2: name = 'morden'; break;
      case 3: name = 'ropsten'; break;
      case 4: name = 'rinkeby'; break;
      default: name = 'localhost';
    }
    console.log('The network is:', name, id);
    resolve({ id, name });
  });
});
/**************************************
* Get Accounts (with promise)
**************************************/
const getAccounts = (web3 = window.web3) => new Promise((resolve, reject) => {
  if (!web3) reject('No web3 instance provided');
  const accounts = web3.eth.accounts;
  let tries = 0;
  const limit = 5;
  const check = () => {
    if (accounts.length > 0) {
      resolve(accounts);
    } else {
      tries++;
      if (tries === limit) {
        reject('accounts could not be found on web3 provider');
        return;
      }
      setTimeout(check, 200);
    }
  };
  check();
});
/**************************************
* Get Contract
**************************************/
const getContract = (json, address, web3 = window.web3) => {
  const contract = TruffleContract(json);
  contract.setProvider(web3.currentProvider);
  return address ? contract.at(address) : contract.deployed();
};
/**************************************
* Exports
**************************************/
export {
  getWeb3,
  getNetwork,
  getAccounts,
  getContract
};
