import React, { Fragment } from "react";
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
import StatusMessage from "../StatusMessage";
import web3 from "../../api/web3";
import RaffleInterface from "../../api/contracts/RaffleVRFKeeperInterface";
import { useRouter } from "next/router";

const INITIAL_TRANSACTION_STATE = {
  loading: "",
  error: "",
  success: "",
  warning: "",
};

const REQUIRED_NETWORK_CHAIN_ID = "0x2a";
//or networkVersion="42"

const RaffleEntry = ({ data, transactionState, setTransactionState }) => {
  const router = useRouter();
  //   console.log("entrydata", data.playersEntered);

  const onRaffleEnter = async (event) => {
    setTransactionState(INITIAL_TRANSACTION_STATE);
    event.preventDefault();
    // if (entryValue !== 0.01) {
    //   () =>
    //     setTransactionState({
    //       ...INITIAL_TRANSACTION_STATE,
    //       error: "Entry Value is 0.01 ether",
    //     });
    //   return;
    // }
    await window.ethereum.enable();
    let chainId = await web3.eth.getChainId(); //depracated in MM
    // if (chainId != REQUIRED_NETWORK_CHAIN_ID) {
    //   changeChainRequest();
    // }

    await web3.eth
      .getAccounts()
      .then(async (accounts) => {
        setTransactionState({
          ...INITIAL_TRANSACTION_STATE,
          loading: "Transaction is processing....",
        });
        await RaffleInterface.methods
          .enter()
          .send({
            from: accounts[0],
            value: data.entryCost, //web3.utils.toWei(entryValue, "ether"),
          })
          .then((res) => {
            // console.log("res", res);
            const etherscanLink = `${process.env.NEXT_PUBLIC_ETHERSCAN_BASE}tx/${res.transactionHash}`;
            setTransactionState({
              ...INITIAL_TRANSACTION_STATE,
              success: (
                <a href={etherscanLink} target="_blank" rel="noreferrer">
                  View the transaction on Etherscan
                </a>
              ),
            });
            router.replace(`/`); //this will refresh the lottery stats on the page
            // fetchData();
          })
          .catch((err) => {
            console.log("error:", err);
            setTransactionState({
              ...INITIAL_TRANSACTION_STATE,
              error: err.message,
            });
          });
      })
      .catch((err) => {
        setTransactionState({
          ...INITIAL_TRANSACTION_STATE,
          error: `Error: ${err.message || "Could not fetch accounts"}`,
        });
      });
  };

  const renderPlayer = (playerAddress, idx) => {
    return (
      <Fragment key={`${playerAddress}-${idx}`}>
        <List.Item key={`${playerAddress}-${idx}`}>
          <List.Icon name="user" size="large" verticalAlign="middle" />
          <List.Content verticalAlign="middle">
            <List.Header as="a">{playerAddress}</List.Header>
          </List.Content>
        </List.Item>
      </Fragment>
    );
  };

  return (
    <div style={{ paddingBottom: "20px" }}>
      <Header as="h2">Enter the raffle!</Header>
      {/* convert cost to ether */}
      {/* <p>{data.entryCost} to enter</p> */}
      {data ? (
        <>
          <p>Max Entrants before draw: {data.maxEntrants} </p>
          <Grid centered>
            <Grid.Column width={3} />
            <Grid.Column width={5}>
              <List divided relaxed>
                <Header>Entered Players</Header>
                {data &&
                data.playersEntered &&
                data.playersEntered.length > 0 ? (
                  data.playersEntered.map((playerAddress, idx) => {
                    return renderPlayer(playerAddress, idx);
                  })
                ) : (
                  <List.Item>No entrants yet - be the first!</List.Item>
                )}
              </List>
            </Grid.Column>
            <Grid.Column width={2} />
            <Grid.Column width={6}>
              {web3.currentProvider.host ? (
                <Card>
                  <Card.Content>
                    <Image
                      floated="right"
                      size="mini"
                      src="/chainlink-logo.png"
                    />
                    <Card.Header>Connect a wallet! </Card.Header>
                    <Card.Meta>
                      Entry Cost: {web3.utils.fromWei(data.entryCost)} ETH
                    </Card.Meta>
                    <Card.Description>
                      You need to connect a wallet to enter this raffle!
                    </Card.Description>
                  </Card.Content>
                </Card>
              ) : data &&
                data.playersEntered &&
                data.playersEntered.length >= data.maxEntrants ? (
                <Card>
                  <Card.Content>
                    <Image
                      floated="right"
                      size="mini"
                      src="/chainlink-logo.png"
                    />
                    <Card.Header>Sorry! Entry Closed</Card.Header>
                    <Card.Meta>
                      Entry Cost: {web3.utils.fromWei(data.entryCost)} ETH
                    </Card.Meta>
                    <Card.Description>
                      Max number of players for this round already reached. Try
                      next round!
                    </Card.Description>
                  </Card.Content>
                </Card>
              ) : (
                <>
                  <Card
                    as="a"
                    onClick={onRaffleEnter}
                    disabled={Boolean(transactionState.loading)}
                  >
                    <Card.Content>
                      <Image
                        floated="right"
                        size="mini"
                        src="/chainlink-logo.png"
                      />
                      <Card.Header>Click to Enter!</Card.Header>
                      <Card.Meta>
                        Entry Cost: {web3.utils.fromWei(data.entryCost)} ETH
                      </Card.Meta>
                    </Card.Content>
                  </Card>
                </>
              )}
            </Grid.Column>
          </Grid>
        </>
      ) : (
        <p>Loading</p>
      )}

      {transactionState && (
        <Container style={{ marginTop: "20px" }}>
          {JSON.stringify(transactionState) !==
            JSON.stringify(INITIAL_TRANSACTION_STATE) && (
            <StatusMessage status={transactionState} />
          )}
        </Container>
      )}
    </div>
  );
};

export default RaffleEntry;
