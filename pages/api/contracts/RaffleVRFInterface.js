import web3 from "../web3";
import RaffleVRF from "../build/contracts/RaffleVRF.json";

const address = process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS_KOVAN_VRF;
const RaffleVRFInterface = new web3.eth.Contract(RaffleVRF.abi, address);
export default RaffleVRFInterface;
