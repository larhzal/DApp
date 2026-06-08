const Parity = artifacts.require("Parity");

module.exports = function(deployer){
    deployer.deploy(Parity);
}