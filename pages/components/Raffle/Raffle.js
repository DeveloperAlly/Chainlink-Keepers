import React, { useState, useEffect } from "react";
import RaffleWinnersList from "./RaffleWinnersList";
import RaffleEntry from "./RaffleEntry";
import RaffleInfo from "./RaffleInfo";
import { Container, Divider, Header } from "semantic-ui-react";
import useInterval from "../../api/utils/useInterval";
import { useRouter } from "next/router";

const INITIAL_TRANSACTION_STATE = {
  loading: "",
  error: "",
  success: "",
  warning: "",
};

const Raffle = ({ data, ...props }) => {
  const router = useRouter();
  const [transactionState, setTransactionState] = useState(
    INITIAL_TRANSACTION_STATE
  );

  const REFRESH_INTERVAL = 5000;
  useInterval(async () => {
    router.push("/"); //refresh the data every 5 seconds
  }, REFRESH_INTERVAL);

  return (
    <div>
      <Container fluid textAlign="center" style={{ paddingTop: "2em" }}>
        {data && <RaffleInfo data={data} />}
        <RaffleEntry
          data={data}
          transactionState={transactionState}
          setTransactionState={setTransactionState}
        />
        <Divider />
        <Container>
          <Header as="h2"> Winners Board</Header>
          {data && data.winnersRegistry && data.winnersRegistry.length > 0 ? (
            <RaffleWinnersList winnersRegistry={data.winnersRegistry} />
          ) : (
            <p>This is the first round!</p>
          )}
        </Container>
      </Container>
    </div>
  );
};

export default Raffle;

// const INITIAL_WALLET_CONNECTION = {
//   connectedStatus: false,
//   address: null,
//   network: null,
// };

// const [raffleData, setRaffleData] = useState(null);
// const [walletConnected, setWalletConnected] = useState(
//   INITIAL_WALLET_CONNECTION
// );

// console.log("data", { data });

//check wallet connection
// useEffect(() => {
//   if (window.ethereum) {
//     if (ethereum.isConnected()) {
//       setWalletConnected({
//         connectedStatus: true,
//         address: ethereum.selectedAddress,
//         network: ethereum.chainId,
//       });
//       // if (ethereum.chainId !== REQUIRED_NETWORK_CHAIN_ID)
//       //   changeChainRequest();
//     }
//     //metamask functions
//     ethereum.on("accountsChanged", (accounts) => {
//       // console.log("accounts", walletConnected, accounts);
//       setWalletConnected({
//         ...walletConnected,
//         address: accounts[0],
//       });
//       setTransactionState(INITIAL_TRANSACTION_STATE);
//     });
//     ethereum.on("chainChanged", (chainId) => {
//       // console.log("chain", chainId);
//       if (chainId !== REQUIRED_NETWORK_CHAIN_ID) {
//         setWalletMessage(
//           <h3 onClick={changeChainRequest} style={{ marginTop: 0 }}>
//             Incorrect Wallet Network! Change to Rinkeby Network 0x4 to enter
//           </h3>
//         );
//         changeChainRequest();
//         setWalletConnected({
//           ...walletConnected,
//           network: ethereum.chainId,
//         });
//         setTransactionState(INITIAL_TRANSACTION_STATE);
//       } else {
//         setWalletMessage(null);
//       }
//     });
//     ethereum.on("disconnect", (err) => {
//       // console.log("wallet disconnected", err);
//       setWalletConnected(INITIAL_WALLET_CONNECTION);
//     });
//   } else {
//     //user needs to connect a wallet to play (still want to display the lottery stats though!)
//     setWalletConnected({
//       connectedStatus: false,
//       status:
//         "To enter - please install an ethereum wallet like Metamask 🦊. You can also click the 'Install Metamask' Button in the header menu",
//       address: null,
//     });
//   }
// }, []);

// useEffect(() => {
//   getRaffleDetails();
// }, []);

// useEffect(() => {
//   console.log("WALLET", walletConnected);
// }, [walletConnected]);

// useEffect(() => {
//   console.log("effect", raffleData);
// }, [raffleData]);

// const getRaffleDetails = async () => {
//   const [contractAddress, manager, entryCost, roundNumber, prizePool] =
//     await Promise.all([
//       RaffleInterface.methods.contractAddress().call(),
//       RaffleInterface.methods.manager().call(),
//       RaffleInterface.methods.entryCost().call(),
//       RaffleInterface.methods.roundNumber().call(),
//       RaffleInterface.methods.prizePool().call(),
//     ]);
//   console.log(
//     "getRaff",
//     contractAddress,
//     manager,
//     entryCost,
//     roundNumber,
//     prizePool
//   );
//   setRaffleData({
//     contractAddress,
//     manager,
//     entryCost,
//     roundNumber,
//     prizePool,
//   });
// };
