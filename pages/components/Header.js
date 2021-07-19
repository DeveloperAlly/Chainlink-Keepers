import React from "react";
import { Menu, Image } from "semantic-ui-react";
import { useRouter } from "next/router";

//Hosts the top level layout of our app
const Header = ({ walletConnected = true }) => {
  const router = useRouter(); // probs should just use withRouter()
  return (
    <Menu style={{ height: "80px" }}>
      {/* <Menu.Item style={{ height: "100%" }}>
        <Image src="/chainlink-logo.png" size="mini" />
      </Menu.Item> */}
      <Menu.Item onClick={() => router.push("/")} style={{ padding: "0 4rem" }}>
        <Image
          src="/chainlink-logo.png"
          size="mini"
          style={{ paddingRight: "10px" }}
        />
        Chainlink Raffle
      </Menu.Item>
      {!walletConnected.connectedStatus ? (
        <Menu.Menu position="right">
          <Menu.Item
            onClick={() => router.push("https://metamask.io/download.html")} //should add a callback to website
            style={{ padding: "0 4rem" }}
          >
            Install Metamask! 🦊
          </Menu.Item>
        </Menu.Menu>
      ) : (
        <Menu.Menu position="right">
          <Menu.Item color="blue">Wallet Connected! 😀</Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  );
};

export default Header;
