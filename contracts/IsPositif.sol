// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract IsPositif {
  function isPositif(int _number) public pure returns (bool){
    return _number > 0;
  }
}
