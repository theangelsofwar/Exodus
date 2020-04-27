const Migrations = artifacts.require("Migrations");
//import the Migrations.sol contract
//notice how artifacts allows the same scope of the contracts
module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
