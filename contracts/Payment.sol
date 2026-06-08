// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Payment {

  address public recipient;

  constructor( address _recipient) {
    recipient = _recipient;
  }

  function recievePayment() public payable{
    require(msg.value > 0, "Payment must be greater than 0");
  }

  function withdraw() public {
    require(msg.sender == recipient, "Only the recipient can withdraw");
    (bool success, ) = recipient.call{value: address(this).balance}("");
    require(success, "Transfer failed");
  }
}
