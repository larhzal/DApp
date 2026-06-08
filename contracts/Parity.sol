// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Parity {
  
  function isEven(uint _number) public pure returns (bool){
    return _number % 2 == 0;
  }

  function isOdd(uint _number) public pure returns (bool){
    return _number % 2 != 0;
  }
  
}
