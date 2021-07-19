import Head from "next/head";
import Image from "next/image";
import { Divider } from "semantic-ui-react";
import styles from "../styles/Home.module.css";
import Layout from "./components/Layout";
import Raffle from "./components/Raffle/Raffle";
import web3 from "./api/web3";
// import RaffleInterface from "./api/contracts/RaffleInterface";
// import RaffleVRFInterface from "./api/contracts/RaffleVRFInterface";
// import RaffleVRFKeeperInterface from "./api/contracts/RaffleVRFKeeperInterface";
import RaffleInterface from "./api/contracts/RaffleVRFKeeperInterface";

const Home = (props) => {
  console.log("Raffle", RaffleInterface);
  console.log("Initial Props", props);

  return (
    <Layout data={props}>
      <Raffle data={props} />
    </Layout>
  );
};

Home.getInitialProps = async () => {
  /*
    Fetch values of things we'll display
      - Prizepool
      - RoundNumber
      - Entry Cost
      - Contract Address
      - Manager
      - Current Players
    */
  const [
    contractAddress,
    manager,
    entryCost,
    roundNumber,
    prizePool,
    winnersRegistry,
    playersEntered,
    maxEntrants,
  ] = await Promise.all([
    RaffleInterface.methods.contractAddress().call(),
    RaffleInterface.methods.manager().call(),
    RaffleInterface.methods.entryCost().call(),
    RaffleInterface.methods.roundNumber().call(),
    RaffleInterface.methods.prizePool().call(),
    RaffleInterface.methods.getWinners().call(),
    RaffleInterface.methods.getPlayers().call(),
    RaffleInterface.methods.numberOfPlayersBeforeDraw().call(),
  ]);

  //   const winnersList = await RaffleInterface.methods.getWinners().call();

  return {
    contractAddress,
    manager,
    entryCost,
    roundNumber,
    prizePool,
    winnersRegistry,
    playersEntered,
    maxEntrants,
  };
};

export default Home;
