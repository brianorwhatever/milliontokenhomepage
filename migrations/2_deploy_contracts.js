var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var MillionTokenHomepage = artifacts.require("./MillionTokenHomepage.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(MillionTokenHomepage);
};
