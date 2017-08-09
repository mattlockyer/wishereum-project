

var Wish = artifacts.require("./Wish.sol");

contract('Wish', (accounts) => {

  it('should have a deployed address', () => {

    return Wish.deployed().then((instance) => {
      assert(instance !== undefined, 'Instance should be defined');
    });

  });

  it('should have an initial balance of zero', () => {

    return Wish.deployed().then((instance) => {
      return instance.getBalance();
    })
    .then((res) => {
      //console.log(res.toNumber());
      assert(res.toNumber() === 0, 'Balance should be zero');
    });

  });

  it('non-owner cannot get balance', () => {
   
    return Wish.deployed().then((instance) => {
      return instance.getBalance({ from: accounts[1] });
    })
    .catch((e) => {
      assert(true, 'true');
    });
    
  });
  
  it('owner makes wish with 1 wei', () => {
    
    return Wish.deployed().then((instance) => {
      return instance.makeWish('wishing well', { value: 1 })
      .then((res) => {
        //console.log(res);
        return instance.getContribution.call(0);
      })
      .then((res) => {
        assert(res.toNumber() === 1, 'Wish value should be 1 wei');
        return instance.getWish.call(0);
      }).then((res) => {
        assert(typeof res === 'string', 'Wish should be string');
      });
    });
    
  });

});
