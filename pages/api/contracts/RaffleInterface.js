import web3 from "../web3";
import Raffle from "../../../build/contracts/Raffle.json";

const address = process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS_KOVAN;
console.log("raffle address", address);
const RaffleInterface = new web3.eth.Contract(Raffle.abi, address);

export default RaffleInterface;
