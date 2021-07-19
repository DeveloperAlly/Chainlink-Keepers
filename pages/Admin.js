import React, { useState } from "react";
import Layout from "./components/Layout";
import {
  Container,
  Header,
  Table,
  Button,
  Input,
  Label,
} from "semantic-ui-react";
import web3 from "./api/web3";
import RaffleInterface from "./api/contracts/RaffleVRFKeeperInterface";
import StatusMessage from "./components/StatusMessage";
import RaffleInfo from "./components/Raffle/RaffleInfo";
import { useRouter } from "next/router";

const INITIAL_TRANSACTION_STATE = {
  loading: "",
  error: "",
  success: "",
  warning: "",
};

const Admin = (props) => {
  const router = useRouter();
  console.log("admin props", props);
  const { Row, Body, Cell, HeaderCell } = Table;
  const [transactionState, setTransactionState] = useState(
    INITIAL_TRANSACTION_STATE
  );

  const pickWinner = async () => {
    await web3.eth
      .getAccounts()
      .then(async (accounts) => {
        setTransactionState({
          ...INITIAL_TRANSACTION_STATE,
          loading: "Transaction is processing....",
        });
        await RaffleInterface.methods
          .pickWinner()
          .send({
            from: accounts[0],
          })
          .then((res) => {
            console.log(res);
            const etherscanLink = `https://kovan.etherscan.io/tx/${res.transactionHash}`;
            setTransactionState({
              ...INITIAL_TRANSACTION_STATE,
              success: (
                <>
                  <p>A winner has been picked! </p>
                  <p>Winner: {res.to} </p>
                  <p>
                    See transaction:
                    <a href={etherscanLink} target="_blank">
                      {etherscanLink}
                    </a>
                  </p>
                </>
              ),
            });
            // fetchData();
            router.replace(`/Admin`);
          })
          .catch((err) =>
            setTransactionState({
              ...INITIAL_TRANSACTION_STATE,
              error: err.message || "Uknown Error occurred",
            })
          );
      })
      .catch((err) =>
        setTransactionState({
          ...INITIAL_TRANSACTION_STATE,
          error: `Error: ${err.message || "Could not fetch accounts"}`,
        })
      );
  };

  return (
    <Layout data={props}>
      <Container textAlign="center">
        <Header>Admin Functions </Header>
        <Table celled>
          <Table.Header>
            <Row textalign="right">
              <HeaderCell
                width={10}
                textAlign="left"
                style={{ paddingLeft: "30px" }}
              >
                Action
              </HeaderCell>
              <HeaderCell width={6} textAlign="center">
                Perform Action
              </HeaderCell>
            </Row>
          </Table.Header>
          <Body>
            <Row>
              <Cell textAlign="left" style={{ paddingLeft: "30px" }}>
                Pick A Winner
              </Cell>
              <Cell textAlign="center">
                <Button
                  color="green"
                  basic
                  size="large"
                  disabled={Boolean(transactionState.loading)} // don't allow more clicks if loading
                  onClick={() => pickWinner()}
                >
                  Pick Winner
                </Button>
              </Cell>
            </Row>
            <Row>
              <Cell textAlign="left" style={{ paddingLeft: "30px" }}>
                Withdraw Link
              </Cell>
              <Cell textAlign="center">
                <Button
                  color="green"
                  basic
                  size="large"
                  disabled={Boolean(transactionState.loading)} // don't allow more clicks if loading
                  // onClick={() => onApprove(index)}
                >
                  Withdraw Link
                </Button>
              </Cell>
            </Row>
            <Row>
              <Cell textAlign="left" style={{ paddingLeft: "30px" }}>
                Set Entry Cost
              </Cell>
              <Cell textAlign="center">
                <Input placeholder="Entry cost in Eth" labelPosition="right">
                  <Label>ETH</Label>
                  <input />
                  <Button
                    basic
                    color="green"
                    disabled={Boolean(transactionState.loading)}
                  >
                    Confirm
                  </Button>
                </Input>
                {/* <Input
                  label={
                    { basic: true, content: "Eth" }
                    // <Button onClick={() => console.log("seteth")}>ETH</Button>
                  }
                  labelPosition="right"
                  placeholder="Enter entry cost..."

                /> */}
                {/* <Button
                  color="green"
                  basic
                  size="medium"
                  //   disabled={Boolean(loading)} // don't allow more clicks if loading
                  // onClick={() => onApprove(index)}
                >
                  C
                </Button> */}
              </Cell>
            </Row>
          </Body>
        </Table>
        {JSON.stringify(transactionState) !==
          JSON.stringify(INITIAL_TRANSACTION_STATE) && (
          <StatusMessage status={transactionState} />
        )}
      </Container>
    </Layout>
  );
};

Admin.getInitialProps = async () => {
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

export default Admin;
