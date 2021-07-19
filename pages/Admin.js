import React, { useState } from "react";
import Layout from "./components/Layout";
import {
  Container,
  Header,
  Table,
  Button,
  Input,
  Label,
  Icon,
} from "semantic-ui-react";
import web3 from "./api/web3";
import RaffleInterface from "./api/contracts/RaffleVRFKeeperInterface";
import StatusMessage from "./components/StatusMessage";
import RaffleInfo from "./components/Raffle/RaffleInfo";
import { useRouter } from "next/router";
import "semantic-ui-css/semantic.min.css";
import ErrorPage from "./components/ErrorPage";

const INITIAL_TRANSACTION_STATE = {
  loading: "",
  error: "",
  success: "",
  warning: "",
};

const Admin = (props) => {
  const router = useRouter();
  const { Row, Body, Cell, HeaderCell } = Table;
  const [transactionState, setTransactionState] = useState(
    INITIAL_TRANSACTION_STATE
  );
  const [entryCostInput, setEntryCostInput] = useState();

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
            const etherscanLink = `${process.env.NEXT_PUBLIC_ETHERSCAN_BASE}/tx/${res.transactionHash}`;
            setTransactionState({
              ...INITIAL_TRANSACTION_STATE,
              success: (
                <>
                  <p>A winner has been picked! </p>
                  <p>Winner: {res.to} </p>
                  <p>
                    See transaction:
                    <a href={etherscanLink} target="_blank" rel="noreferrer">
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

  const setEntryCost = async () => {
    await web3.eth
      .getAccounts()
      .then(async (accounts) => {
        setTransactionState({
          ...INITIAL_TRANSACTION_STATE,
          loading: "Transaction is processing....",
        });
        await RaffleInterface.methods
          .setEntryCost(web3.utils.toWei(entryCostInput, "ether"))
          .send({
            from: accounts[0],
          })
          .then((res) => {
            console.log(res);
            const etherscanLink = `${process.env.NEXT_PUBLIC_ETHERSCAN_BASE}tx/${res.transactionHash}`;
            setTransactionState({
              ...INITIAL_TRANSACTION_STATE,
              success: (
                <>
                  <p>Entry Cost has been changed! </p>
                  <p>New Entry Price: {entryCostInput} ETH </p>
                  <p>
                    See transaction:
                    <a href={etherscanLink} target="_blank" rel="noreferrer">
                      {etherscanLink}
                    </a>
                  </p>
                </>
              ),
            });
            // fetchData();
            setEntryCostInput(null);
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
    <>
      {web3 &&
      web3.currentProvider &&
      web3.currentProvider.selectedAddress &&
      props &&
      props.manager &&
      web3.currentProvider.selectedAddress.toLowerCase() ===
        props.manager.toLowerCase() ? (
        <Layout data={props}>
          <Container textAlign="center">
            <Header>Admin Functions </Header>
            <Button
              style={{
                backgroundColor: "royalblue",
                color: "white",
                padding: "14px 24px",
              }}
              icon
              size="large"
              onClick={() => router.push("/")}
            >
              {"Home    "}
              <Icon name="home" />
            </Button>
            <Container style={{ paddingTop: "3em" }}>
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
                      <Input
                        placeholder="Entry cost in Eth"
                        labelPosition="right"
                      >
                        <Label>ETH</Label>
                        <input
                          type="number"
                          min="0"
                          step="0.001"
                          value={entryCostInput}
                          onChange={(event) =>
                            setEntryCostInput(event.target.value)
                          }
                        />
                        <Button
                          basic
                          color="green"
                          disabled={Boolean(transactionState.loading)}
                          onClick={() => setEntryCost()}
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
            </Container>
            {transactionState &&
              JSON.stringify(transactionState) !==
                JSON.stringify(INITIAL_TRANSACTION_STATE) && (
                <StatusMessage status={transactionState} />
              )}
          </Container>
        </Layout>
      ) : (
        <ErrorPage />
      )}
    </>
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
