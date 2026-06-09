// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CryptoConvert {
  
  function etherToWei(uint _ether) public pure returns (uint){
    return _ether * 1 ether;
  }

  function weiToEther(uint _wei) public pure returns (uint){
    return _wei / 1 ether;
  }
}


