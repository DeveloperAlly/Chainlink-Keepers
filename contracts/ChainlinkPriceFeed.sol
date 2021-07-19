// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

//To run on remix use Injected Web3 with Metamask on Rinkeby network activated

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract ChainlinkPriceFeed {
    
    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     */
    constructor() public {
        // Examples -> Rinkeby network 
        // See https://docs.chain.link/docs/reference-contracts/ for available feeds and blockchains
        // priceData["ETHUSD"] = 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e;
        // priceData["BTCUSD"] = 0xECe365B379E1dD183B20fc5f022230C044d51404;
        // priceData["LINKUSD"] = 0xd8bD0a1cB028a31AA859A21A3758685a95dE4623;
        // priceData["AUDUSD"]= 0x21c095d2aDa464A294956eA058077F14F66535af;
    }

    /**
     * Returns the latest price information from the asset address
     */
    function getLatestPrice(address assetAddress) public view returns 
    (int price, uint80 roundID, int decimals, string memory description, uint timestamp) 
    {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(assetAddress);
        (            
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        string memory description = priceFeed.description();
        int decimals = priceFeed.decimals();

        return (price, roundID, decimals, description, timestamp);
    }
}
