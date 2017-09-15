

//jshint ignore: start

pragma solidity ^0.4.11;

contract Wish {
  
  //structs
  struct WishStruct {
    string wish;
    uint256 amount;
    address wisher;
  }
  
  //public
  WishStruct[] public wishes;
  uint256 public totalWishes;
  
  //private
  uint256 private balance;
  address private owner;
  mapping(address => uint256[]) private indicies;
  
  //modifiers
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  //constructor
  function Wish() {
    owner = msg.sender;
  }
  
  //payable
  function() payable {
    balance += msg.value;
  }
  
  /**************************************
  * public methods
  **************************************/
  function makeWish(string wish) payable returns (bool) {
    if (msg.value < 1 finney) revert();
    balance += msg.value;
    indicies[msg.sender].push(wishes.length);
    wishes.push(WishStruct(wish, msg.value, msg.sender));
    totalWishes = wishes.length;
    return true;
  }
  
  function getIndicies() constant returns (uint256[]) {
    return indicies[msg.sender];
  }
  
  /**************************************
  * private (onlyOwner) methods
  **************************************/
  function getBalance() onlyOwner constant returns (uint256) {
    return balance;
  }
  
  function sendBalance(address dest) onlyOwner {
    dest.transfer(balance);
    balance = 0;
  }

  function transferOwnership(address newOwner) onlyOwner {
    require(newOwner != address(0));
    owner = newOwner;
  }
    
}

//jshint ignore: end
