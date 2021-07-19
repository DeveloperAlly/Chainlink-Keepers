import React from "react";
import { Card, Header, Divider } from "semantic-ui-react";
import web3 from "../../api/web3";

const RaffleInfo = ({ data }) => {
  console.log("info", data);
  const renderItem = (header, value) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          // paddingBottom: "10px",
        }}
      >
        <Header style={{ paddingRight: "10px" }}>{header} </Header>
        {header == "Prize Pool" && value
          ? `${web3.utils.fromWei(value)} ETH`
          : value}
      </div>
    );
  };

  const renderRaffleInfo = () => {
    return (
      <>
        <Card
          style={{ boxShadow: "none", paddingBottom: 0 }}
          fluid
          href="#card-example-link-card"
          content={renderItem(
            "Contract Address",
            data ? data.contractAddress : null
          )}
          // header="Elliot Baker"
          // meta="Friend"
          // description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
        />
        <Card
          style={{ boxShadow: "none", paddingBottom: 0 }}
          fluid
          href="#card-example-link-card"
          content={renderItem("Manager", data ? data.manager : null)}
        />
        <Card
          style={{ boxShadow: "none", paddingBottom: 0 }}
          fluid
          href="#card-example-link-card"
          content={renderItem("Prize Pool", data ? data.prizePool : null)}
        />
        <Card
          style={{ boxShadow: "none", paddingBottom: 0 }}
          fluid
          href="#card-example-link-card"
          content={renderItem("Round Number", data ? data.roundNumber : null)}
        />
        <Divider />
      </>
    );
  };

  return <>{renderRaffleInfo()}</>;
};

export default RaffleInfo;
