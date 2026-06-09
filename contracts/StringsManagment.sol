// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract StringsManagment {
  string message;

  function setMessage(string memory _message) public {
    message = _message;
  }

  function getMessage() public view returns (string memory){
    return message;
  }

  function concat(string memory _message1, string memory _message2) public pure returns (string memory){
    return string.concat(_message1, " ", _message2);
  }

  function concatWith(string memory _paramMessage) public view returns (string memory){
    return string.concat(message, " ", _paramMessage);
  }

  function messageLength(string memory _message) public pure returns (uint){
    return bytes(_message).length;
  }

  function compare(string memory _message1, string memory _message2) public pure returns (bool){
    return keccak256(bytes(_message1)) == keccak256(bytes(_message2));
  }
}


