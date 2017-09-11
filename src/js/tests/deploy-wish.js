
export default {
  deploy(json, from, gas) {
    const contract = TruffleContract(json);
    
    console.log(contract);
    
    contract.setProvider(web3.currentProvider);
    contract.new(null, {
      from, gas
    });
  }
};
  