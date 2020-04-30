var ExodusList = artifacts.require("./ExodusList.sol");

module.exports = function(deployer) {
  deployer.deploy(ExodusList);
};