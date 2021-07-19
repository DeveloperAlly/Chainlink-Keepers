let Raffle = artifacts.require("./Raffle.sol");
let RaffleVRF = artifacts.require("./RaffleVRF.sol");
let RaffleVRFKeeper = artifacts.require("./RaffleVRFKeeper.sol");
let ChainlinkPriceFeed = artifacts.require("./ChainlinkPriceFeed.sol");

module.exports = function (deployer) {
  deployer.deploy(Raffle);
  deployer.deploy(RaffleVRF);
  deployer.deploy(RaffleVRFKeeper);
  deployer.deploy(ChainlinkPriceFeed);
  //add others here
};
