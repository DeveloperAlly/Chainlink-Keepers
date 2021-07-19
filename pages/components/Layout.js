import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Image from "next/image";
import Head from "next/head";
import PriceMarquee from "./PriceMarquee";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import {
  Transition,
  Header,
  Image as SImage,
  Button,
  Icon,
} from "semantic-ui-react";
import web3 from "../api/web3";

//Hosts the top level layout of our app & also handles wallet connection.
// const Layout = ({ walletConnected, ...props }) => {
const Layout = ({ data, ...props }) => {
  const router = useRouter();

  const renderAdminButton = () => {
    return (
      <Button
        basic
        color="blue"
        icon
        size="large"
        onClick={() => router.push("/Admin")}
      >
        {"Admin Page   "}
        <Icon name="cog" />
      </Button>
    );
  };

  const renderConnectWallet = () => {
    return (
      <Button
        as="a"
        href="https://metamask.io/download.html"
        target="_blank"
        rel="noreferrer"
        basic
        color="blue"
        size="large"
      >
        Install Metamask! 🦊
      </Button>
    );
  };

  const renderConnectedButton = () => {
    return (
      <Button basic color="blue" size="large" onClick={() => router.push("/")}>
        Connected
      </Button>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Chainlink Raffle</title>
        <meta name="description" content="Blockchain Trustless Raffle App" />
        <link rel="icon" href="/chainlink-logo.png" />
      </Head>
      <main className={styles.main}>
        <Container
          fluid
          textAlign="right"
          style={{ paddingTop: "10px", paddingRight: "30px" }}
        >
          {web3.currentProvider.host
            ? renderConnectWallet()
            : renderConnectedButton()}
        </Container>
        <Container fluid>
          <Header as="h1" icon textAlign="center">
            {/* put transition on a loop */}
            <Transition animation="tada" duration="1500" transitionOnMount>
              <SImage src="/chainlink-logo.png" />
            </Transition>
            <Header.Content style={{ paddingTop: "20px" }}>
              Chainlink Testnet Raffle
            </Header.Content>
          </Header>
          {props.children}
        </Container>
      </main>
      <footer className={styles.footer}>
        <a href="https://docs.chain.link/" target="_blank" rel="noreferrer">
          <span className={styles.logo}>
            <Image
              src="/PoweredByChainlinkBlue.svg"
              alt="Powered By Chainlink Logo"
              width={300}
              height={40}
            />
          </span>
        </a>
      </footer>
      {/* <PriceMarquee /> */}
    </div>
  );
};

export default Layout;
