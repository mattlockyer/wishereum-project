

//jshint ignore: start

pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Wish.sol";

contract TestWish {

  function testDeployed() {
    //Wish wish = Wish(DeployedAddresses.Wish());
    Assert.isNotZero(DeployedAddresses.Wish(), 'Contract should be deployed with address');
  }

}

//jshint ignore: end