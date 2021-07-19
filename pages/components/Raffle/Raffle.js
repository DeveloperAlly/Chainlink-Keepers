import React, { useState, useEffect } from "react";
import RaffleInterface from "../../api/contracts/RaffleInterface";
import StatusMessage from "../StatusMessage";
import RaffleWinnersList from "./RaffleWinnersList";
import RaffleEntry from "./RaffleEntry";
import RaffleInfo from "./RaffleInfo";
import web3 from "../../api/web3";
import {
  Button,
  Container,
  Divider,
  Header,
  Card,
  Image,
  Message,
  Transition,
  Grid,
  List,
} from "semantic-ui-react";

const INITIAL_TRANSACTION_STATE = {
  loading: "",
  error: "",
  success: "",
  warning: "",
};

const Raffle = ({ data, ...props }) => {
  const [raffleData, setRaffleData] = useState(null);
  const [transactionState, setTransactionState] = useState(
    INITIAL_TRANSACTION_STATE
  );
  console.log("data", { data });

  useEffect(() => {
    getRaffleDetails();
  }, []);

  useEffect(() => {
    console.log("effect", raffleData);
  }, [raffleData]);

  const getRaffleDetails = async () => {
    const [contractAddress, manager, entryCost, roundNumber, prizePool] =
      await Promise.all([
        RaffleInterface.methods.contractAddress().call(),
        RaffleInterface.methods.manager().call(),
        RaffleInterface.methods.entryCost().call(),
        RaffleInterface.methods.roundNumber().call(),
        RaffleInterface.methods.prizePool().call(),
      ]);
    console.log(
      "getRaff",
      contractAddress,
      manager,
      entryCost,
      roundNumber,
      prizePool
    );
    setRaffleData({
      contractAddress,
      manager,
      entryCost,
      roundNumber,
      prizePool,
    });
  };

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
          {data.winnersRegistry.length > 0 ? (
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
