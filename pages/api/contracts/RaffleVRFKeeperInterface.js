import web3 from "../web3";
import RaffleVRFKeeper from "../build/contracts/RaffleVRFKeeper.json";

const address = process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS_KOVAN_KEEPER;
const RaffleVRFKeeperInterface = new web3.eth.Contract(
  RaffleVRFKeeper.abi,
  address
);
export default RaffleVRFKeeperInterface;
