

//jshint ignore: start

var Wish = artifacts.require("./Wish.sol");

contract('Wish', (accounts) => {
  
  let wish;
  const owner = accounts[0];
  const random = accounts[1];
  const finney = 1000000000000000;

  it('should have a deployed address', async () => {
    wish = await Wish.deployed();
    assert(wish !== undefined, 'wish contract should be defined');
  });

  it('should have an initial balance of zero', async () => {
    const balance = await wish.getBalance.call();
    assert(balance.toNumber() === 0, 'balance should be zero');
  });

  it('non-owner cannot get balance', async () => {
    try {
      const balance = await wish.getBalance.call({ from: random });
    } catch (e) {
      assert(true, 'non-owner cannot get balance');
    }
  });
  
  /**************************************
  * Wishes
  **************************************/

  it('should have undefined tx if amount too low', async () => {
    let tx;
    try {
      tx = await wish.makeWish('random wish', { value: finney - 1, from: random });
    } catch (e) {
      console.log('exception caught');
    }
    assert(tx === undefined, 'non-owner cannot get balance');
  });
  
  it('make a lot of wishes', async () => {
    let tx;
    for (let i = 0; i < 10; i++) {
      tx = await wish.makeWish('random wish number ' + (i+1), { value: finney, from: random });
      assert(tx !== undefined, 'wish transaction');
      tx = await wish.makeWish('owner wish number ' + (i+1), { value: finney, from: owner });
      assert(tx !== undefined, 'wish transaction');
    }
    assert(true, 'wishes made');
  });
  
  
  it('should return the random wishes', async () => {
    const indicies = await wish.getIndicies.call({ from: random });
    for (let i in indicies) {
      const w = await wish.wishes.call(indicies[i].toNumber());
    }
    assert(true, 'wishes returned');
  });
  
  it('should return last 10 wishes', async () => {
    const totalWishes = await wish.totalWishes.call();
    for (let i = totalWishes - 1; i >= totalWishes - 10; i--) {
      const w = await wish.wishes.call(i);
      console.log(w[0]);
    }
    assert(true, 'wishes returned');
  });

});
