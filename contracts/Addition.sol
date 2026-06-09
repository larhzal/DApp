// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Addition {
  uint a;
  uint b;

  function setA(uint _a) public {
    a = _a;
  }

  function setB(uint _b) public {
    b = _b;
  }

  function addition1() public view returns (uint) {
    return a + b;
  }

  function addition2(uint _a, uint _b) public pure returns (uint){
    return _a +_b;
  }
}
