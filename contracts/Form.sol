// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

abstract contract Form {
  uint public x;
  uint public y;

  constructor(uint _x, uint _y){
    x = _x;
    y = _y;
  }

  function move(uint dx, uint dy) public {
    x += dx;
    y += dy;
  }

  function displayXY() public view returns (uint, uint){
    return (x, y);
  }

  function displayInfo() public pure virtual returns (string memory){
    return "Je suis une forme";
  }

  function area() public view virtual returns (uint); 
}

