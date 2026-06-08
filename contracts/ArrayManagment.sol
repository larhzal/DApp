// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ArrayManagment {
  uint [] public numbers;  

  // constructor() {
  //   numbers.push(5);
  //   numbers.push(19);
  //   numbers.push(1);
  //   numbers.push(2);
  // }

  function addNumber(uint _number) public{
    numbers.push(_number);
  }

  function getElement(uint _index) public view returns(uint){
    require(_index < numbers.length, "Index not exists");
    return numbers[_index];
  }

  function displayArray() public view returns(uint [] memory){
    return numbers;
  }

  function sum() public view returns (uint){
    uint total = 0;
    for (uint i=0; i < numbers.length; i++){
      total += numbers[i];
    }
    return total;
  }

  function clearArray() public {
    delete numbers;
}

  
}
