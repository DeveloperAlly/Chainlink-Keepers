let Raffle = artifacts.require("../build/contracts/Raffle.sol");
let RaffleVRF = artifacts.require("../build/contracts/RaffleVRF.sol");
let RaffleVRFKeeper = artifacts.require(
  "../build/contracts/RaffleVRFKeeper.sol"
);

module.exports = function (deployer) {
  deployer.deploy(Raffle);
  deployer.deploy(RaffleVRF);
  deployer.deploy(RaffleVRFKeeper);
  //add others here
};
