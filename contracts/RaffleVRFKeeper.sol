// SPDX-License-Identifier: MIT
pragma solidity 0.6.7;
pragma experimental ABIEncoderV2;
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

/*
* The interface for Chainlink Keepers - see docs: https://docs.chain.link/docs/chainlink-keepers/introduction/
*/
interface KeeperCompatibleInterface {
    function checkUpkeep(bytes calldata checkData) external returns (bool upkeepNeeded, bytes memory performData);
    function performUpkeep(bytes calldata performData) external;
}

/*
* This contract uses Chainlink VRF to pick a random winner for a raffle then uses Chainlink Keepers to automatically trigger 
* the function that picks a winner when the number of players entered requirement is met.
* This contract runs in Remix with Kovan Network selected in wallet. Requires registering of a keeper (https://keeper.chain.link/) 
* and sending LINK to the contract address (for VRF)
*/
contract RaffleVRFKeeper is VRFConsumerBase, KeeperCompatibleInterface {
    address public contractAddress; //reference only
    address payable public manager; //contract owner
    uint public roundNumber; //the raffle round identifier
    uint public entryCost; //cost to enter the raffle in wei (have a setter for the admin)

    /*
    * Winners Record to keep all winners
    */
    struct Winner {
        address winnerAddress;
        uint256 winnerAmount;
        uint round;
    }
    Winner [] public winnerRegistry; //keep all winners of this lottery
    
    /*
    * Variables for each round
    */
    address payable[] public players;
    uint256 public prizePool;
    uint public numberOfPlayersBeforeDraw; /* ADDED */
    
    /*
    /*
    * VRF Variables
    */
    bytes32 internal keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
    uint256 internal fee = 0.1 * 10 ** 18;
    address private LinkToken = 0xa36085F69e2889c224210F603D836748e7dC0088;
    address private VRFCoordinator = 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9;
    uint public randomWinnerNumber; //the index of the winning player in players array

    /*
    * Variables for Chainlink Keeper upkeep function
    */
    bool public pickingWinner = false;
    
    
    /*
    * Constructor gives Chainlink VRF (for verifiable random number generation) function the kovan network Variables required - change as needed
    */
    constructor() public VRFConsumerBase(VRFCoordinator, LinkToken) {
        manager = msg.sender;
        roundNumber = 1;
        contractAddress = address(this);
        entryCost = 10000000000000000;
        prizePool = 0; //set prizePool initial value

        numberOfPlayersBeforeDraw = 3; //we'll use this to trigger the keeper function to draw the lottery
    }
    
    /**
     * Restricted to owner only modifier to add to functions
    */    
    modifier ownerOnly() {
        require(msg.sender == manager);
        _;
    }

    /**
    * @notice Enter the raffle
    */
    function enter() public payable {
        //ensure the user is sending enough to enter
        require(msg.value == entryCost);
        require(players.length < numberOfPlayersBeforeDraw); /* ADDED */
        //user can enter raffle as many times as they like for more chances
        players.push(msg.sender);
        //increment the value of the prizepool
        prizePool = prizePool + (msg.value);
    }

    /**
    * @notice Pick a raffle winner NO LONGER NEEDED - 
    * though we'll keep this as a manual override in case of failure
    */   
    function pickWinner() public {
        //because we're making this public lets put some require statements in for some security
        require(players.length == numberOfPlayersBeforeDraw);
        pickingWinner = true;   //so our upkeep does not fire more than once while waiting for our randomnumber 
        
        //because fulfilling a random number takes some time, we are going to move the
        //actions for paying the winner and then resetting the raffle to another function which
        //will be called from the fulfillRandomness function so that we know we have a random winner
        getRandomNumber();
    }

    // /**
    // * @notice pick a random number uses keccak - changed to Chainlink VRF
    // */
    // function getRandomNumber() private view returns (uint) {
    //     //randomWinnerNumber = uint(keccak256(abi.encodePacked(now, block.difficulty, msg.sender)));
    //     return uint(keccak256(abi.encodePacked(now, block.difficulty, msg.sender)));
    // }


    /**
    Chainlink Keeper Function that checks if conditions have been met to perform the next action
     */
    function checkUpkeep(bytes calldata checkData) external override returns (bool upkeepNeeded, bytes memory performData) {
        upkeepNeeded = players.length >= numberOfPlayersBeforeDraw && !pickingWinner; //check for randomNumber here as well

        // We don't use the checkData in this example
        // checkData was defined when the Upkeep was registered
        performData = checkData;
    }

    function performUpkeep(bytes calldata performData) external override {
        pickWinner();

        // We don't use the performData in this example
        // performData is generated by the Keeper's call to your `checkUpkeep` function
        performData;
    }

    /** 
     * Requests randomness 
     * Returns a hash essentially (requestId)
     */
    function getRandomNumber() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        requestId = requestRandomness(keyHash, fee);
    }

    /**
     * Callback function used by VRF Coordinator - sets the randomNumber used to decide the winner
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomWinnerNumber = randomness.mod(players.length).add(1);
        //Once the random number is fulfilled we will deal with paying the winner
        endRaffleRound();
    }

    function endRaffleRound() private {
         Winner memory newWinner =  Winner({
            winnerAddress: players[randomWinnerNumber],
            winnerAmount: address(this).balance,
            round: roundNumber
        });
        winnerRegistry.push(newWinner);
        //pay the winner
        players[randomWinnerNumber].transfer(address(this).balance);
        //clear the players array & prizePool
        players = new address payable[](0);
        pickingWinner = false;
        prizePool = 0;
        //increment the round number
        incrementRoundNumber();
    }

    /**
    * @notice increments the raffle round number
    */
    function incrementRoundNumber() private {
        roundNumber = roundNumber+1;
    }

   /**
    * @notice helper function to display players for frontends
    */
    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    /**
    * @notice helper function to display winners for frontends
    */
    function getWinners() public view returns (Winner [] memory) {
        return winnerRegistry;
    }

    /**
    * @notice manager only functions
    */
    function setEntryCost(uint value) public ownerOnly {
        entryCost = value;
    }
    
    /**
     * @notice set number of players that can enter before draw ends
    */
    function setNumberOfPlayersBeforeDraw(uint numPlayers) public ownerOnly {
        numberOfPlayersBeforeDraw = numPlayers;
    }
    
    //testing only function that obviously should never go in the deployed contract (rugpull anyone!?)
    function rugpullWithdrawEth() public ownerOnly{
        manager.transfer(address(this).balance);
    }
    
    /*
     * @notice Withdraw LINK from this contract.
     * @dev this is an example only, and in a real contract withdrawals should
     * happen according to the established withdrawal pattern: 
     * https://docs.soliditylang.org/en/v0.4.24/common-patterns.html#withdrawal-from-contracts
     */
    function withdrawLink() public ownerOnly{
        LINK.transfer(manager, LINK.balanceOf(address(this)));
    }

}   