import web3 from "../web3";
import ChainlinkPriceFeed from "../../../build/contracts/ChainlinkPriceFeed.json";

const address =
  process.env.NEXT_PUBLIC_DEPLOYED_CONTRACT_ADDRESS_KOVAN_PRICEFEED;
const PriceFeedInstance = new web3.eth.Contract(
  ChainlinkPriceFeed.abi,
  address
);
export default PriceFeedInstance;
