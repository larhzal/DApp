const Payment = artifacts.require("Payment");

// module.exports = function (deployer) {
//   deployer.deploy(Payment, "0x02837229dae5ee54049975759708209614aF41f3");
// }

module.exports = function (deployer, network, accounts) {
  deployer.deploy(Payment, accounts[0]);
};