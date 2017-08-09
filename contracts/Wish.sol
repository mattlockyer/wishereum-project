

//jshint ignore: start

pragma solidity ^0.4.11;

contract Wish {
    
    //External
    uint[] public contributions;
    
    //Internal
    uint internal balance;
    address internal owner;
    string[] internal wishes;

    function Wish() {
        balance = 0;
        owner = msg.sender;
    }
    
    function() payable {
        balance += msg.value;
    }
    
    function makeWish(string wish) payable returns (bool) {
        if (msg.value < 1) revert();
        balance += msg.value;
        contributions.push(msg.value);
        wishes.push(wish);
        return true;
    }
    
    /*
    * Getters
    */
    
    function getContributions() constant returns (uint[]) {
        return contributions;
    }
    
    function getContribution(uint which) constant returns (uint) {
        return contributions[which];
    }
    
    function getWish(uint which) returns (string) {
        return wishes[which];
    }
    
    /*
    * Only Owner
    */
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    function sendBalance(address dest) onlyOwner {
        dest.transfer(balance);
        balance = 0;
    }
    
    function getBalance() onlyOwner constant returns (uint) {
        return balance;
    }

    function transferOwnership(address newOwner) onlyOwner {
        require(newOwner != address(0));
        owner = newOwner;
    }
    
}

//jshint ignore: end
