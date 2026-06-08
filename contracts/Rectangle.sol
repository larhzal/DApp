// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Form.sol";

contract Rectangle is Form {
  uint public width;
  uint public height;
  
  constructor(uint _x, uint _y, uint _width, uint _height) Form(_x, _y) {
    width = _width;
    height = _height;
  }

  function area() public view override returns (uint){
    return width * height;
  }
  
  function displayInfo() public pure override returns (string memory){
    return "Je suis un rectangle";
  }

  function displayWidthHeight() public view returns (uint, uint){
    return (width, height);
  }


}
